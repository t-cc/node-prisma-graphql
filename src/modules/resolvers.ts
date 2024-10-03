import { NonEmptyArray } from 'type-graphql'

import authResolvers from '@modules/auth/resolvers.js'
import categoryResolvers from '@modules/categories/resolvers.js'

export const resolvers = [
  ...categoryResolvers,
  ...authResolvers,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
] as NonEmptyArray<Function>
