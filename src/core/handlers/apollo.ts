import cookie from 'cookie'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Server } from 'node:http'
import { CustomAuthChecker } from 'src/core/auth.js'
import { buildSchema } from 'type-graphql'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { User } from '@generated/type-graphql/models/User.js'
import { UserInfo } from '@modules/auth/types.js'
import { resolvers } from '@modules/resolvers.js'
import { PrismaClient } from '@prisma/client'

import { ApolloContext } from './types.js'

const COOKIE_NAME = process.env.COOKIE_NAME!
const SECRET_KEY: string = process.env.SECRET_KEY!
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

const allowMethods = (...methods: string[]) => {
  return (req: Request, res: Response, next: () => void) => {
    if (
      !methods.map((m) => m.toUpperCase()).includes(req.method.toUpperCase())
    ) {
      return res.status(401).send(`Method ${req.method} not allowed`)
    }
    next()
  }
}

export async function connectApollo(httpServer: Server, app: Express) {
  const prisma = new PrismaClient()

  const schema = await buildSchema({
    resolvers,
    validate: false,
    authChecker: CustomAuthChecker,
  })

  const apollo = new ApolloServer<ApolloContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    formatError: (err) => {
      console.error(err)
      return err
    },
  })
  await apollo.start()

  app.use(
    '/graphql',
    allowMethods(
      ...(IS_DEVELOPMENT ? ['GET', 'POST', 'OPTIONS'] : ['POST', 'OPTIONS']),
    ),
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(apollo, {
      context: async ({ req: request, res: response }) => ({
        prisma,
        getUserInfo: (): UserInfo | undefined => {
          const cookies = cookie.parse(request.headers.cookie || '')

          const token = cookies[COOKIE_NAME] || request.headers.authorization
          if (!token) {
            return
          }
          const user = jwt.verify(token, SECRET_KEY) as UserInfo
          user.token = token
          return user
        },
        setUserInfo: (user: User): string => {
          const payload = {
            id: user.id,
            email: user.email,
          }
          const token = jwt.sign(payload, SECRET_KEY)
          response.cookie(COOKIE_NAME, token, {
            path: '/',
            httpOnly: true,
            secure: true,
          })
          return token
        },
        clearAuthCookie: (): void => {
          response.clearCookie(COOKIE_NAME)
        },
      }),
    }),
  )
}
