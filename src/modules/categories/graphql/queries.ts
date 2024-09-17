import type { ApolloContext } from '@core/handlers/types.js'
import { Category } from '@generated/type-graphql/models/Category.js'
import { Ctx, Query, Resolver } from 'type-graphql'

@Resolver(() => Category)
export class CategoryQueries {
  @Query(() => Category)
  async firstCategory(@Ctx() ctx: ApolloContext) {
    return ctx.prisma.category.findFirst()
  }

  @Query(() => [Category])
  async categories(@Ctx() ctx: ApolloContext) {
    return ctx.prisma.category.findMany()
  }
}
