import type { ApolloContext } from '@core/handlers/types.js'
import emailQueue from '@queues/email.js'
import { Me } from './fields.js'
import bcrypt from 'bcrypt'
import { LoginArgs, SendEmailArgs } from './inputs.js'
import type { GraphQLResolveInfo } from 'graphql'
import * as TypeGraphQL from 'type-graphql'
import { User } from '@generated/type-graphql/models/User.js'

const SECRET_KEY = process.env.SECRET_KEY

@TypeGraphQL.Resolver(() => User)
export class AuthMutations {

  @TypeGraphQL.Mutation(() => Me, {nullable: true})
  async login(
    @TypeGraphQL.Ctx() ctx: ApolloContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: LoginArgs,
  ): Promise<User | null> {
    const user = (await ctx.prisma.user.findFirst({
      where: {
        email: args.email,
      },
    })) as Me
    if (user && user.password) {
      if (
        user &&
        (await bcrypt.compare(`${args.password}${SECRET_KEY}`, user.password))
      ) {
        user.token = ctx.setUserInfo(user)
        return user
      }
    }
    return null
  }

  @TypeGraphQL.Mutation(() => TypeGraphQL.Int, {
    nullable: true,
  })
  async logout(@TypeGraphQL.Ctx() ctx: ApolloContext): Promise<void> {
    ctx.clearAuthCookie()
    return
  }


  @TypeGraphQL.Mutation(() =>  Boolean)
  async sendEmail(
    @TypeGraphQL.Ctx() ctx: ApolloContext,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: SendEmailArgs,
  ): Promise<boolean> {
    await emailQueue.add('email', { email: args.email })

    return false
  }
}
