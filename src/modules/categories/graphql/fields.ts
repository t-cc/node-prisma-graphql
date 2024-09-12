import { ApolloContext } from '@core/handlers/types'
import { Category } from '@generated/type-graphql'
import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.Resolver(() => Category)
export class CategoryFieldResolver {
  @TypeGraphQL.FieldResolver(() => String, { nullable: true })
  async fullName(
    @TypeGraphQL.Root() category: Category,
    @TypeGraphQL.Ctx() ctx: ApolloContext,
  ): Promise<String | undefined> {
    return 'hello'
  }

  @TypeGraphQL.FieldResolver(() => Date, { nullable: true })
  async now(
    @TypeGraphQL.Root() category: Category,
    @TypeGraphQL.Ctx() ctx: ApolloContext,
  ): Promise<Date> {
    return new Date()
  }
}
