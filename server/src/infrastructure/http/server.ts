import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { errorHandler } from './middleware/errorHandler';
import { config } from '@/application/config/config';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { NodeController, TreeController, QueueController, PostController } from '@/infrastructure/http/controllers';

export interface IServerOptions {
  port: number;
  store: INodeStore;
  queue: ITaskQueue;
}

export class Server {
  private server: FastifyInstance;
  private store: INodeStore;
  private queue: ITaskQueue;

  private nodeController: NodeController;
  private treeController: TreeController;
  private postController: PostController;
  private queueController: QueueController;

  constructor(options: IServerOptions) {
    this.server = Fastify();
    this.server.register(cors);
    this.server.setErrorHandler(errorHandler);

    this.queue = options.queue;
    this.store = options.store;

    this.nodeController = new NodeController(this.store);
    this.treeController = new TreeController(this.store);
    this.postController = new PostController();
    this.queueController = new QueueController(this.queue, this.store);
  
    this.setupRoutes();
  }

  private setupRoutes(): void {
    this.server.get('/nodes', (request, reply) => this.nodeController.listNode(request, reply));
    this.server.get('/nodes/:url', (request, reply) => this.nodeController.getNodeByURL(request, reply));
    this.server.get('/nodes/count', (request, reply) => this.nodeController.countNodes(request, reply));
    this.server.get('/tree', (request, reply) => this.treeController.getTree(request, reply));
    this.server.get('/tree/ascii', (request, reply) => this.treeController.getTreeASCII(request, reply));
    this.server.get('/queue', (request, reply) => this.queueController.getQueueStatus(request, reply));
    this.server.post('/domain', (request, reply) => this.postController.sendURL(request, reply));
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