import { Me } from './fields'
import bcrypt from 'bcrypt'
import { LoginArgs } from './inputs'
import type { GraphQLResolveInfo } from 'graphql'
import * as TypeGraphQL from 'type-graphql'
import { User } from '@generated/type-graphql'

const SALT_ROUNDS = 10
const SUPER_SECRET_KEY = 'supersecretcode-CHANGE_THIS-USE_ENV_FILE'

@TypeGraphQL.Resolver((_of) => User)
export class AuthMutations {
  @TypeGraphQL.Mutation((_returns) => User, {
    nullable: true,
  })
  async createUser(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LoginArgs,
  ): Promise<User | null> {
    const count = await ctx.prisma.user.count()
    if (count === 0) {
      // count is 0 or if current user is super admin
      const hash = await bcrypt.hash(
        `${args.password}${SUPER_SECRET_KEY}`,
        SALT_ROUNDS,
      )
      return ctx.prisma.user.create({
        data: {
          email: args.email,
          password: hash,
          isSuperAdmin: true,
        },
      })
    }
    return null
  }

  @TypeGraphQL.Mutation((_returns) => Me, {
    nullable: true,
  })
  async login(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LoginArgs,
  ): Promise<User | null> {
    const user = await ctx.prisma.user.findFirst({
      where: {
        email: args.email,
      },
    })
    if (
      user &&
      (await bcrypt.compare(
        `${args.password}${SUPER_SECRET_KEY}`,
        user.password,
      ))
    ) {
      user.token = ctx.setUserInfo(user)
      return user
    }
    return null
  }

  @TypeGraphQL.Mutation((_returns) => TypeGraphQL.Int, {
    nullable: true,
  })
  async logout(
    @TypeGraphQL.Ctx() ctx: any,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LoginArgs,
  ): Promise<void> {
    ctx.clearAuthCookie()
    return
  }
}
