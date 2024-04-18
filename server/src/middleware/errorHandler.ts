// infrastructure/http/middleware/errorHandler.ts
import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
    console.error(`Error processing request ${request.id}: `, error);
    reply.status(500).send({ error: 'Internal Server Error' });
}
