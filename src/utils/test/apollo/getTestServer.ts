import 'reflect-metadata'
import { buildSchema } from 'type-graphql'

import { ApolloServer } from '@apollo/server'
import { CustomAuthChecker } from '@core/auth.js'
import { resolvers } from '@modules/resolvers.js'

export async function getTestServer() {
  const schema = await buildSchema({
    resolvers,
    validate: false,
    authChecker: CustomAuthChecker,
  })

  return new ApolloServer({
    schema,
  })
}
