import { Category } from '@generated/type-graphql/models/Category.js'
import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.Resolver(() => Category)
export class CategoryFieldResolver {
  @TypeGraphQL.FieldResolver(() => String, { nullable: true })
  async fullName(): Promise<string | undefined> {
    return 'hello'
  }

  @TypeGraphQL.FieldResolver(() => Date, { nullable: true })
  async now(): Promise<Date> {
    return new Date()
  }
}
