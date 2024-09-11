import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.InputType('CategoryUpdateInput', {})
export class CategoryUpdateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  code?: string | undefined

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string | undefined
}

@TypeGraphQL.ArgsType()
export class CreateCategoryArgs {
  @TypeGraphQL.Field((_type) => CategoryUpdateInput, {
    nullable: false,
  })
  data!: CategoryUpdateInput
}

@TypeGraphQL.ArgsType()
export class UpdateCategoryArgs {
  @TypeGraphQL.Field((_type) => CategoryUpdateInput, {
    nullable: false,
  })
  data!: CategoryUpdateInput

  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  categoryId!: number
}
