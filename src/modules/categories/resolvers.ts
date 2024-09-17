import { NonEmptyArray } from 'type-graphql'
import { CategoryMutations } from './graphql/mutations.js'
import { CategoryFieldResolver } from './graphql/fields.js'
import { CategoryQueries } from './graphql/queries.js'

export default [
  CategoryQueries,
  CategoryFieldResolver,
  CategoryMutations,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
] as NonEmptyArray<Function>
