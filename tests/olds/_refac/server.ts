import Fastify from 'fastify'
import cors from '@fastify/cors'

import { tree } from "./interfaces/api/routes/tree";
import { treeascii } from "./interfaces/api/routes/treeascii";
import { queue } from "./interfaces/api/routes/queue";
import { domain } from "./interfaces/api/routes/domain";

const server = Fastify()
server.register(cors, { 
  hook: 'preHandler',
})

server.register(domain, {
  prefix: 'domain',
})
// server.register(tree)
// server.register(treeascii)
// server.register(queue)

server
  .listen({
    port: Number(process.env.PORT) || 3000,
  })
  .then(() => {
    console.log(`Server running on ${process.env.PORT}!`);
  });