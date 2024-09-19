import type { ApolloContext } from '@core/handlers/types.js'
import emailQueue from '@modules/auth/tasks.js'
import { Me } from './fields.js'
import bcrypt from 'bcrypt'
import { LoginArgs, SendEmailArgs } from './inputs.js'
import type { GraphQLResolveInfo } from 'graphql'
import {Mutation, Resolver, Info, Args, Ctx, Int} from 'type-graphql'
import { User } from '@generated/type-graphql/models/User.js'

const SECRET_KEY = process.env.SECRET_KEY

@Resolver(() => User)
export class AuthMutations {

  @Mutation(() => Me, {nullable: true})
  async login(
    @Ctx() ctx: ApolloContext,
    @Info() info: GraphQLResolveInfo,
    @Args() args: LoginArgs,
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

  @Mutation(() => Int, {
    nullable: true,
  })
  async logout(@Ctx() ctx: ApolloContext): Promise<void> {
    ctx.clearAuthCookie()
    return
  }


  @Mutation(() =>  Boolean)
  async sendEmail(
    @Ctx() ctx: ApolloContext,
    @Info() info: GraphQLResolveInfo,
    @Args() args: SendEmailArgs,
  ): Promise<boolean> {
    await emailQueue.add('email', { email: args.email })

    return false
  }
}
