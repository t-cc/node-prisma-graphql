import { User } from '@generated/type-graphql'
import { Me } from './fields'
import { Ctx, Query, Resolver } from 'type-graphql'

@Resolver((of) => User)
export class AuthQueries {
  @Query((returns) => Me, { nullable: true })
  async me(@Ctx() ctx: any) {
    const userInfo = ctx.getUserInfo()
    if (!userInfo) {
      return null
    }
    const user = await ctx.prisma.user.findFirst({
      where: { id: userInfo.id },
    })
    user.token = userInfo.token
    return user
  }
}
