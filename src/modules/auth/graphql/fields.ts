import { User } from '@generated/type-graphql'
import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.ObjectType('Me', {})
export class Me extends User {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  token!: string
}
