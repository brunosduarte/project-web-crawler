import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';

import { errorHandler } from '@/middleware/errorHandler';
import { config } from '@/application/config/config';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { registerRoutes } from './routes';

export interface IServerOptions {
  port: number;
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
      // origin: 'http://localhost:3000' || 'https://sitemapper.net',
    });
    this.queue = options.queue;
    this.store = options.store;
    registerRoutes(this.server, this.store, this.queue); 

    this.server.setErrorHandler(errorHandler);
  }

  async start(): Promise<void> {
    try {
      await this.server.listen({ port: config.port });
      console.log(`Listening at http://localhost:${config.port}`);
    } catch (err) {
      console.error('Error starting server:', err);
      process.exit(1);
    }
  }
}