import { AuthMutations } from './graphql/mutations'
import { AuthQueries } from './graphql/queries'
import { NonEmptyArray } from 'type-graphql'

export default [AuthMutations, AuthQueries] as NonEmptyArray<Function>
