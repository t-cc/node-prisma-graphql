import { Resolver, FieldResolver, Root } from 'type-graphql'

import { Category } from '@generated/type-graphql/models/Category.js'

@Resolver(() => Category)
export class CategoryFieldResolver {
  @FieldResolver(() => String, { nullable: false })
  async code(@Root() category: Category): Promise<string> {
    return `CODE-${category.code}`
  }

  @FieldResolver(() => String, { nullable: false })
  async fullName(@Root() category: Category): Promise<string> {
    return `${category.code}-${category.name}`
  }

  @FieldResolver(() => Date, { nullable: true })
  async now(): Promise<Date> {
    return new Date()
  }
}
