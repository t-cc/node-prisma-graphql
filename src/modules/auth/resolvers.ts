import { NonEmptyArray } from 'type-graphql'

import { AuthMutations } from './graphql/mutations.js'
import { AuthQueries } from './graphql/queries.js'

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export default [AuthMutations, AuthQueries] as NonEmptyArray<Function>
