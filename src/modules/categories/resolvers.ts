import { NonEmptyArray } from 'type-graphql'

import { CategoryFieldResolver } from './graphql/fields.js'
import { CategoryMutations } from './graphql/mutations.js'
import { CategoryQueries } from './graphql/queries.js'

export default [
  CategoryQueries,
  CategoryFieldResolver,
  CategoryMutations,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
] as NonEmptyArray<Function>
