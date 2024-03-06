import { FastifyInstance } from "fastify"

export async function treeascii(server: FastifyInstance) {
  server.get('/tree/ascii', async () => {
    const result = await console.log(server)
    return result
  })
}