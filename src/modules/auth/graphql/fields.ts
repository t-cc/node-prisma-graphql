import { ObjectType, Field } from 'type-graphql'

import { User } from '@generated/type-graphql/models/User.js'

@ObjectType('Me', {})
export class Me extends User {
  @Field(() => String, {
    nullable: false,
  })
  token!: string
}
