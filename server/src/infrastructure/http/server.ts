import Fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import cors from '@fastify/cors';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { PostController, NodeController, TreeController, QueueController } from '@/infrastructure/http/controllers';

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

  constructor(private options: IServerOptions) {
    this.server = Fastify();
    this.server.register(cors);

    this.store = options.store;
    this.queue = options.queue;

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

  getPort(): number {
    return this.options.port;
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.listen(this.options.port, (err, address) => {
        if (err) {
          console.error(`Error starting server: ${err}`);
          reject(err);
        } else {
          console.log(`Server listening at ${address}`);
          resolve();
        }
      });
    });
  }
}
