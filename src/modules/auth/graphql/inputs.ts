import {ArgsType, Field} from 'type-graphql'

@ArgsType()
export class LoginArgs {
  @Field(() => String, {
    nullable: false,
  })
  email!: string

  @Field(() => String, {
    nullable: false,
  })
  password!: string
}

@ArgsType()
export class SendEmailArgs {
  @Field(() => String, {
    nullable: false,
  })
  email!: string

}
