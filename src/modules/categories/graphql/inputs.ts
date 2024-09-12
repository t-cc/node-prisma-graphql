import * as TypeGraphQL from 'type-graphql'

@TypeGraphQL.InputType('CategoryUpdateInput', {})
export class CategoryUpdateInput {
  @TypeGraphQL.Field(() => String, {
    nullable: true,
  })
  code?: string | undefined

  @TypeGraphQL.Field(() => String, {
    nullable: true,
  })
  name?: string | undefined
}

@TypeGraphQL.InputType('CategoryCreateInput', {})
export class CategoryCreateInput {
  @TypeGraphQL.Field(() => String, {
    nullable: false,
  })
  code!: string

  @TypeGraphQL.Field(() => String, {
    nullable: false,
  })
  name!: string
}

@TypeGraphQL.ArgsType()
export class CreateCategoryArgs {
  @TypeGraphQL.Field(() => CategoryCreateInput, {
    nullable: false,
  })
  data!: CategoryCreateInput
}

@TypeGraphQL.ArgsType()
export class UpdateCategoryArgs {
  @TypeGraphQL.Field(() => CategoryUpdateInput, {
    nullable: false,
  })
  data!: CategoryUpdateInput

  @TypeGraphQL.Field(() => TypeGraphQL.Int, {
    nullable: false,
  })
  categoryId!: number
}
