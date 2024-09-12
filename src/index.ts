import 'reflect-metadata'
import { User } from '@generated/type-graphql'
import { UserInfo } from '@modules/auth/types'
import Fastify from 'fastify'
import { ApolloServer, BaseContext } from '@apollo/server'
import {
  fastifyApolloHandler,
  fastifyApolloDrainPlugin,
  ApolloFastifyContextFunction,
} from '@as-integrations/fastify'
import { PrismaClient } from '@prisma/client'
import categoryResolvers from '@modules/categories/resolvers'
import authResolvers from '@modules/auth/resolvers'
import { buildSchema } from 'type-graphql'
import jwt from '@fastify/jwt'
import fCookie from '@fastify/cookie'

const fastify = Fastify({
  logger: false, // depends on env...
})

fastify.get('/healthcheck', (req, res) => {
  res.send({ message: 'Success' })
})

fastify.register(jwt, { secret: 'supersecretcode-CHANGE_THIS-USE_ENV_FILE' })
// fastify.addHook('preHandler', (req, res, next) => {
//   // here we are
//   // console.log(fastify.jwt)
//   // req.jwt = fastify.jwt
//   return next()
// })

// cookies
fastify.register(fCookie, {
  secret: 'some-secret-key', //  @todo: key move to env
  // hook: 'preHandler',
})

async function main() {
  // Apollo
  const prisma = new PrismaClient()

  interface ApolloContext extends BaseContext {
    prisma: PrismaClient
  }
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
      reply.setCookie('token', token, {
        path: '/',
        httpOnly: true,
        secure: true,
      })
      return token
    },
    getUserInfo: (): UserInfo | undefined => {
      const token = request.cookies.token || request.headers.authorization
      if (!token) {
        return
      }
      const user = fastify.jwt.verify<UserInfo>(token)
      user.token = token
      return user
    },
    clearAuthCookie: (): void => {
      reply.clearCookie('token')
    },
  })

  const schema = await buildSchema({
    resolvers: [...categoryResolvers, ...authResolvers],
    validate: false,
  })
  const apollo = new ApolloServer<BaseContext>({
    schema,
    plugins: [fastifyApolloDrainPlugin(fastify)],
  })
  await apollo.start()

  fastify.route({
    url: '/graphql',
    method: ['GET', 'POST', 'OPTIONS'],
    // method: ['POST', 'OPTIONS''], // allow only POST and OPTIONS in prod
    handler: fastifyApolloHandler(apollo, { context: apolloContextFn }),
  })
  /// -- end of Apollo

  try {
    await fastify.listen({ port: 3000 })
    console.log(`✨🚀 Fastify server ready at: http://localhost:3000/`)
    console.log(`✨🚀 GraphQL ready at: http://localhost:3000/graphql`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
})

void main()
