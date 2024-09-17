import { AuthMutations } from './graphql/mutations.js'
import { AuthQueries } from './graphql/queries.js'
import { NonEmptyArray } from 'type-graphql'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default [AuthMutations, AuthQueries] as NonEmptyArray<Function>
