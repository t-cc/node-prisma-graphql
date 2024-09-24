import 'dotenv/config'
// 👆 this must be the first import
import 'reflect-metadata'
import { connectApollo } from '@core/handlers/apollo.js'
import express, { Express } from 'express'
import http from 'http';

// import queues definitions
import './tasks.js'


const PORT: number = parseInt(process.env.SERVER_PORT!)


const app : Express = express();

app.get('/healthcheck', (req, res) => {
  res.send('OK')
})

// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

await connectApollo(httpServer, app);

await new Promise<void>((resolve) => httpServer.listen({ port: PORT, host: '0.0.0.0' }, resolve));


console.log(`✨🚀 AdminJS at: http://localhost:${PORT}/admin`)
console.log(`✨🚀 GraphQL ready at: http://localhost:${PORT}/graphql`)
