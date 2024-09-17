import type{ ApolloContext } from '@core/handlers/types.js'
import { Me } from './fields.js'
import { Ctx, Query, Resolver, Authorized } from 'type-graphql'

@Resolver(() => Me)
export class AuthQueries {
  @Authorized()
  @Query(() => Me, { nullable: true })
  async me(@Ctx() ctx: ApolloContext) {
    const userInfo = ctx.getUserInfo()
    if (!userInfo || !userInfo.token) {
      return null
    }
    const user = (await ctx.prisma.user.findFirst({
      where: { id: userInfo.id },
    })) as Me
    user.token = userInfo.token
    return user
  }
}
