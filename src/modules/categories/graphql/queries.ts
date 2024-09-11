import { Category } from '@generated/type-graphql'
import { Ctx, Query, Resolver } from 'type-graphql'

@Resolver((of) => Category)
export class CategoryQueries {
  @Query((returns) => Category)
  async firstCategory(@Ctx() ctx: any) {
    return ctx.prisma.category.findFirst()
  }

  @Query((returns) => [Category])
  async categories(@Ctx() ctx: any) {
    return ctx.prisma.category.findMany()
  }
}
