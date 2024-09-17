import { User } from '@generated/type-graphql/models/User.js'
import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.ObjectType('Me', {})
export class Me extends User {
  @TypeGraphQL.Field(() => String, {
    nullable: false,
  })
  token!: string
}
