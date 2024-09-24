import 'dotenv/config'
// 👆 this must be the first import
import 'reflect-metadata'
import { addAdminJsToFastify } from '@core/handlers/adminjs.js'
import { connectApollo } from '@core/handlers/apollo.js'
import Fastify from 'fastify'
import express, { Express } from 'express'
import http from 'http';
import jwt from '@fastify/jwt'

// import queues definitions
import './tasks.js'


const PORT: number = parseInt(process.env.SERVER_PORT!)
const SECRET_KEY: string = process.env.SECRET_KEY!
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'


const app : Express = express();

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

await connectApollo(httpServer, app);

await new Promise<void>((resolve) => httpServer.listen({ port: PORT, host: '0.0.0.0' }, resolve));


console.log(`✨🚀 AdminJS at: http://localhost:${PORT}/admin`)
console.log(`✨🚀 GraphQL ready at: http://localhost:${PORT}/graphql`)

/*
const fastify = Fastify({
  logger: false,
})

async function main() {


  fastify.register(jwt, { secret: SECRET_KEY })

  fastify.get('/healthcheck', (req, res) => {
    res.send({ message: 'Success' })
  })


  await addAdminJsToFastify(fastify)

  const apolloHandler = await getApolloHandler(fastify)
  fastify.route({
    url: '/graphql',
    method: IS_DEVELOPMENT ?  ['GET', 'POST', 'OPTIONS'] : ['POST', 'OPTIONS'],
    handler: apolloHandler,
  })

  try {
    await fastify.listen({ port: PORT, host: '0.0.0.0' })
    console.log(`✨🚀 AdminJS at: http://localhost:${PORT}/admin`)
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


 */
