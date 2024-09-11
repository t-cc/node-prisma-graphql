import { NonEmptyArray } from 'type-graphql'
import { CategoryMutations } from './graphql/mutations'
import { CategoryFieldResolver } from './graphql/fields'
import { CategoryQueries } from './graphql/queries'

export default [
  CategoryQueries,
  CategoryFieldResolver,
  CategoryMutations,
] as NonEmptyArray<Function>
