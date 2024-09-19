import { Category } from '@generated/type-graphql/models/Category.js'
import {Resolver, FieldResolver} from 'type-graphql'

@Resolver(() => Category)
export class CategoryFieldResolver {
  @FieldResolver(() => String, { nullable: true })
  async fullName(): Promise<string | undefined> {
    return 'hello'
  }

  @FieldResolver(() => Date, { nullable: true })
  async now(): Promise<Date> {
    return new Date()
  }
}
