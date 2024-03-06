import { FastifyInstance } from "fastify"

export async function domain(server: FastifyInstance) {
  server.post('/', async (request, reply) => {
    try {
      const domainToCrawl = request.body
      console.log('domain',domainToCrawl)
      return reply.status(201)
      

    } catch (err) {
      console.error(err)
      return reply.status(500)
      //TODO: handle error
    }
  })
}