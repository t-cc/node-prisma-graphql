import 'reflect-metadata'
import Fastify from 'fastify'
import { ApolloServer, BaseContext } from '@apollo/server'
import {
  fastifyApolloHandler,
  fastifyApolloDrainPlugin,
  ApolloFastifyContextFunction,
} from '@as-integrations/fastify'
import { PrismaClient } from '@prisma/client'
import categoryResolvers from '@modules/categories/resolvers'
import { buildSchema } from 'type-graphql'

async function main() {
  const fastify = Fastify({
    logger: true,
  })

  const prisma = new PrismaClient()

  interface ApolloContext extends BaseContext {
    prisma: PrismaClient
  }
  const apolloContextFn: ApolloFastifyContextFunction<
    ApolloContext
  > = async () => ({
    prisma,
  })

  const schema = await buildSchema({
    resolvers: [...categoryResolvers],
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

  try {
    await fastify.listen({ port: 3000 })
    console.log(`✨🚀 Fastify server ready at: http://localhost:3000/`)
    console.log(`✨🚀 GraphQL ready at: http://localhost:3000/graphql`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

void main()
