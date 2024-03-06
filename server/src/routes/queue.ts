import { FastifyInstance } from "fastify"

export async function queue(server: FastifyInstance) {
  server.get('/queue', async () => {
    const result = await console.log(server)
    return result
  })
}