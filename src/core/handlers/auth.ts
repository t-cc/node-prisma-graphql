import { ApolloContext } from './types'
import { AuthCheckerInterface, ResolverData } from 'type-graphql'

export class CustomAuthChecker implements AuthCheckerInterface<ApolloContext> {
  constructor() {}

  check({ context }: ResolverData<ApolloContext>, roles: string[]) {
    const userInfo = context.getUserInfo()
    if (!userInfo) {
      return false
    }
    // Add other checks here, e.g. check if user is admin
    // customize the roles argument to match your needs
    return true
  }
}
