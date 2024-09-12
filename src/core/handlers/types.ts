import { BaseContext } from '@apollo/server'
import { User } from '@generated/type-graphql'
import { UserInfo } from '@modules/auth/types'
import { PrismaClient } from '@prisma/client'

export interface ApolloContext extends BaseContext {
  prisma: PrismaClient
  setUserInfo: (user: User) => string
  getUserInfo: () => UserInfo | undefined
  clearAuthCookie: () => void
}
