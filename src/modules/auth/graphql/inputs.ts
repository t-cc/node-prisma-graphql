import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.ArgsType()
export class LoginArgs {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string
}
