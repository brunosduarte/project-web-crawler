import { FastifyInstance } from "fastify"

export async function tree(server: FastifyInstance) {
  server.get('/tree', async () => {
    const result = await console.log(server)
    return result
  })
}