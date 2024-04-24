import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import { errorHandler } from '@/middleware/errorHandler';
import { config } from '@/application/config';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { registerRoutes } from './routes';

export interface IServerOptions {
  store: INodeStore;
  queue: ITaskQueue;
}

export class Server {
  private server: FastifyInstance;
  private store: INodeStore;
  private queue: ITaskQueue;

  constructor(options: IServerOptions) {
    this.server = Fastify();
    this.server.register(cors, {
      origin: "*",
    });
    this.queue = options.queue;
    this.store = options.store;
    registerRoutes(this.server, this.store, this.queue); 

    this.server.setErrorHandler(errorHandler);
  }

  async start(): Promise<void> {
    try {
      await this.server.listen({ port: config.port });
      console.log(`Listening at ${config.host}`);
    } catch (err) {
      console.error('Failed to start server: ', err);
      process.exit(1);
    }
  }
}