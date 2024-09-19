import { Category } from '@generated/type-graphql/models/Category.js'
import {Resolver, FieldResolver, Root} from 'type-graphql'

@Resolver(() => Category)
export class CategoryFieldResolver {
   @FieldResolver(() => String, { nullable: false })
  async fullName(@Root() category: Category): Promise<string> {
    return `${category.code}-${category.name}`
  }

  @FieldResolver(() => Date, { nullable: true })
  async now(): Promise<Date> {
    return new Date()
  }
}
