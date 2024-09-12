import { NonEmptyArray } from 'type-graphql'
import { CategoryMutations } from './graphql/mutations'
import { CategoryFieldResolver } from './graphql/fields'
import { CategoryQueries } from './graphql/queries'

export default [
  CategoryQueries,
  CategoryFieldResolver,
  CategoryMutations,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
] as NonEmptyArray<Function>
