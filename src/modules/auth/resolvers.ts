import { AuthMutations } from './graphql/mutations'
import { AuthQueries } from './graphql/queries'
import { NonEmptyArray } from 'type-graphql'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default [AuthMutations, AuthQueries] as NonEmptyArray<Function>
