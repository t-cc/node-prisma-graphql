import 'dotenv/config'
// 👆 this must be the first import
import 'reflect-metadata'
import { addAdminJsToFastify } from '@core/handlers/adminjs.js'
import { getApolloHandler } from '@core/handlers/apollo.js'
import Fastify from 'fastify'
import jwt from '@fastify/jwt'

// import queues definitions
import './queues.js'


const fastify = Fastify({
  logger: false, // depends on env...??
})

const PORT: number = parseInt(process.env.SERVER_PORT!)
const SECRET_KEY: string = process.env.SECRET_KEY!
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

fastify.register(jwt, { secret: SECRET_KEY })

fastify.get('/healthcheck', (req, res) => {
  res.send({ message: 'Success' })
})

async function main() {

  await addAdminJsToFastify(fastify)

  const apolloHandler = await getApolloHandler(fastify)
  fastify.route({
    url: '/graphql',
    method: IS_DEVELOPMENT ?  ['GET', 'POST', 'OPTIONS'] : ['POST', 'OPTIONS'],
    handler: apolloHandler,
  })

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`✨🚀 Fastify server ready at: http://localhost:${PORT}/`)
    console.log(`✨🚀 GraphQL ready at: http://localhost:${PORT}/graphql`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

// graceful shutdown
const listeners = ['SIGINT', 'SIGTERM']
listeners.forEach((signal) => {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
})

void main()
