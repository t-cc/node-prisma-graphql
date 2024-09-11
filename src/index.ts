import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { PrismaClient } from '@prisma/client'
import categoryResolvers from '@modules/categories/resolvers'
import { buildSchema } from 'type-graphql'

async function main() {
  const prisma = new PrismaClient()

  const schema = await buildSchema({
    resolvers: [...categoryResolvers],
    validate: false,
  })

  const server = new ApolloServer({ schema })

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ prisma }),
    listen: { port: 4000 },
  })

  console.log(`✨🚀 Server ready at: ${url}`)
}

main().catch(console.error)
