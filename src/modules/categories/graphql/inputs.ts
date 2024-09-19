import  {InputType, Field, ArgsType, Int} from 'type-graphql'

@InputType('CategoryUpdateInput', {})
export class CategoryUpdateInput {
  @Field(() => String, {
    nullable: true,
  })
  code?: string | undefined

  @Field(() => String, {
    nullable: true,
  })
  name?: string | undefined
}

@InputType('CategoryCreateInput', {})
export class CategoryCreateInput {
  @Field(() => String, {
    nullable: false,
  })
  code!: string

  @Field(() => String, {
    nullable: false,
  })
  name!: string
}

@ArgsType()
export class CreateCategoryArgs {
  @Field(() => CategoryCreateInput, {
    nullable: false,
  })
  data!: CategoryCreateInput
}

@ArgsType()
export class UpdateCategoryArgs {
  @Field(() => CategoryUpdateInput, {
    nullable: false,
  })
  data!: CategoryUpdateInput

  @Field(() => Int, {
    nullable: false,
  })
  categoryId!: number
}

@ArgsType()
export class UpdateCategoryFlatArgs {
  @Field(() => String, {
    nullable: true,
  })
  code?: string | undefined

  @Field(() => String, {
    nullable: true,
  })
  name?: string | undefined

  @Field(() => Int, {
    nullable: false,
  })
  categoryId!: number
}