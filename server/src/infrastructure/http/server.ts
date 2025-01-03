import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { registerRoutes } from './routes';

interface IServerOptions {
  store: INodeStore;
  queue: ITaskQueue;
}
const _port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export class Server {
  private server: FastifyInstance;
  private store: INodeStore;
  private queue: ITaskQueue;

  constructor(options: IServerOptions) {
    this.server = Fastify();
    this.server.register(cors, {
      origin: true,
    });
    this.queue = options.queue;
    this.store = options.store;
    registerRoutes(this.server, this.store, this.queue); 
  }

  async start(): Promise<void> {
    this.server.listen({ port: _port, host: '0.0.0.0' }, (err, address) => {
      if (err) {
        console.error('Failed to start server: ',err?.message);
        process.exit(1);
      }
      console.log(`Listening at ${address}`)
    });
  }
}