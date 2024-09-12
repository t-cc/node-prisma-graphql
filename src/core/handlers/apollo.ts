import { ApolloServer, BaseContext } from '@apollo/server'
import { CustomAuthChecker } from './auth'
import { User } from '@generated/type-graphql'
import {
  ApolloFastifyContextFunction,
  fastifyApolloDrainPlugin,
  fastifyApolloHandler,
} from '@as-integrations/fastify'
import authResolvers from '@modules/auth/resolvers'
import { UserInfo } from '@modules/auth/types'
import categoryResolvers from '@modules/categories/resolvers'
import { PrismaClient } from '@prisma/client'
import { ApolloContext } from './types'
import { FastifyInstance } from 'fastify'
import { buildSchema } from 'type-graphql'

const COOKIE_NAME = process.env.COOKIE_NAME!

export async function getApolloHandler(fastify: FastifyInstance) {
  const prisma = new PrismaClient()

  const apolloContextFn: ApolloFastifyContextFunction<ApolloContext> = async (
    request,
    reply,
  ) => ({
    prisma,
    setUserInfo: (user: User): string => {
      const payload = {
        id: user.id,
        email: user.email,
      }
      const token = fastify.jwt.sign(payload)
      reply.setCookie(COOKIE_NAME, token, {
        path: '/',
        httpOnly: true,
        secure: true,
      })
      return token
    },
    getUserInfo: (): UserInfo | undefined => {
      const token =
        request.cookies[COOKIE_NAME] || request.headers.authorization
      if (!token) {
        return
      }
      const user = fastify.jwt.verify<UserInfo>(token)
      user.token = token
      return user
    },
    clearAuthCookie: (): void => {
      reply.clearCookie(COOKIE_NAME)
    },
  })

  const schema = await buildSchema({
    resolvers: [...categoryResolvers, ...authResolvers],
    validate: false,
    authChecker: CustomAuthChecker,
  })
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  })
  await apollo.start()

  return fastifyApolloHandler(apollo, { context: apolloContextFn })
}
