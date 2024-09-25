import { ApolloContext } from '@core/handlers/types.js'
import { User } from '@generated/type-graphql/models/User.js'
import { UserInfo } from '@modules/auth/types.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const defaultContext: ApolloContext = {
  prisma,
  getUserInfo: (): UserInfo | undefined => {
    return
  },
  /* eslint-disable @typescript-eslint/no-unused-vars */
  setUserInfo: (user: User): string => {
    return ''
  },
  clearAuthCookie: (): void => {
    return
  },
}
