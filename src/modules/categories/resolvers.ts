import { CategoryFieldResolver } from './graphql/fields.js'
import { CategoryMutations } from './graphql/mutations.js'
import { CategoryQueries } from './graphql/queries.js'

export default [CategoryQueries, CategoryFieldResolver, CategoryMutations]
