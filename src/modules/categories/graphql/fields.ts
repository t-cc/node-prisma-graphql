import { Context } from 'node:vm'
import { Category } from '@generated/type-graphql'
import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.Resolver((of) => Category)
export class CategoryFieldResolver {
  @TypeGraphQL.FieldResolver((type) => String, { nullable: true })
  async fullName(
    @TypeGraphQL.Root() category: Category,
    @TypeGraphQL.Ctx() { prisma }: Context,
  ): Promise<String | undefined> {
    return 'hello'
  }

  @TypeGraphQL.FieldResolver((type) => Date, { nullable: true })
  async now(
    @TypeGraphQL.Root() category: Category,
    @TypeGraphQL.Ctx() { prisma }: Context,
  ): Promise<Date> {
    return new Date()
  }
}
