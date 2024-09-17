import AdminJSFastify from '@adminjs/fastify'
import { Database, getModelByName, Resource } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import AdminJS from 'adminjs'
import Fastify from 'fastify'

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })


const adminJS = new AdminJS({
  databases: [],
  rootPath: '/admin',
  resources: [{
    resource: { model: getModelByName('Category'), client: prisma },
    options: {},
  }, {
    resource: { model: getModelByName('Product'), client: prisma },
    options: {},
  }, {
    resource: { model: getModelByName('User'), client: prisma },
    options: {},
  }],
});

if (process.env.NODE_ENV === 'development') {
  adminJS.watch()
}

export async function addAdminJsToFastify(fastify:  Fastify.FastifyInstance) {

  await AdminJSFastify.buildRouter(
    adminJS,
    fastify,
  )

}