import type { ApolloContext } from '@core/handlers/types.js'
import  { Category } from '@generated/type-graphql/models/Category.js'
import { CreateCategoryArgs, UpdateCategoryArgs, UpdateCategoryFlatArgs } from './inputs.js'
import {Resolver, Mutation, Ctx, Args, Info} from 'type-graphql'
import type { GraphQLResolveInfo } from 'graphql'

@Resolver(() => Category)
export class CategoryMutations {
  @Mutation(() => Category, {
    nullable: true,
  })
  async createCategory(
    @Ctx() ctx: ApolloContext,
    @Info() info: GraphQLResolveInfo,
    @Args() args: CreateCategoryArgs,
  ): Promise<Category | null> {
    return ctx.prisma.category.create({
      data: {
        ...args.data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })
  }

  @Mutation(() => Category, {
    nullable: true,
  })
  async updateCategory(
    @Ctx() ctx: ApolloContext,
    @Info() info: GraphQLResolveInfo,
    @Args() args: UpdateCategoryArgs,
  ): Promise<Category | null> {
    return ctx.prisma.category.update({
      data: {
        ...args.data,
        updatedAt: new Date(),
      },
      where: {
        id: args.categoryId,
      },
    })
  }

  @Mutation(() => Category, {
    nullable: true,
  })
  async updateCategoryFlat(
    @Ctx() ctx: ApolloContext,
    @Info() info: GraphQLResolveInfo,
    @Args() args: UpdateCategoryFlatArgs,
  ): Promise<Category | null> {
    return ctx.prisma.category.update({
      data: {
        code: args.code,
        name: args.name,
        updatedAt: new Date(),
      },
      where: {
        id: args.categoryId,
      },
    })
  }
}
