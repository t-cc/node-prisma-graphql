import AdminJS from 'adminjs'
import bcrypt from 'bcrypt'
import { Express } from 'express'

import AdminJSExpress, { AuthenticationOptions } from '@adminjs/express'
import { Database, getModelByName, Resource } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'

const SECRET_KEY = process.env.SECRET_KEY!
const COOKIE_NAME = process.env.COOKIE_NAME!

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const adminJS = new AdminJS({
  branding: {
    companyName: 'COMPANY_NAME',
    // favicon: FAVICON,
    // logo: LOGO,
    withMadeWithLove: false,
  },
  databases: [],
  rootPath: '/admin',
  loginPath: '/admin/login',
  logoutPath: '/admin/logout',
  resources: [
    {
      resource: { model: getModelByName('Category'), client: prisma },
      options: {},
    },
    {
      resource: { model: getModelByName('Product'), client: prisma },
      options: {},
    },
    {
      resource: { model: getModelByName('User'), client: prisma },
      options: {},
    },
  ],
})

if (process.env.NODE_ENV === 'development') {
  adminJS.watch()
}

const loginAdmin = async (
  email: string,
  password: string,
): Promise<{ email: string } | void> => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  })

  if (user && user.password) {
    if (
      user &&
      (await bcrypt.compare(`${password}${SECRET_KEY}`, user.password))
    ) {
      return { email }
    }
  }
}

const auth: AuthenticationOptions = {
  authenticate: loginAdmin,
  cookieName: `${COOKIE_NAME}_adminjs`,
  cookiePassword: SECRET_KEY,
}

export function connectAdminJs(app: Express) {
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, auth)
  app.use(adminJS.options.rootPath, adminRouter)
}
