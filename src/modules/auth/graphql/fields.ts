import { User } from '@generated/type-graphql/models/User.js'
import { ObjectType, Field } from 'type-graphql'

@ObjectType('Me', {})
export class Me extends User {
  @Field(() => String, {
    nullable: false,
  })
  token!: string
}
