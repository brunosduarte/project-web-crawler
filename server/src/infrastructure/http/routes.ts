import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { NodeController } from '@/infrastructure/http/controllers/NodeController';
import { TreeController } from '@/infrastructure/http/controllers/TreeController';
import { QueueController } from '@/infrastructure/http/controllers/QueueController';
import { PostController } from '@/infrastructure/http/controllers/PostController';

export class Routes {
  constructor(private server: FastifyInstance,
              private nodeController: NodeController,
              private treeController: TreeController,
              private queueController: QueueController,
              private postController: PostController) {}

  public setupRoutes(): void {
    this.server.get('/nodes', (request, reply) => this.nodeController.listNode(request, reply));
    this.server.get('/nodes/:url', (request, reply) => this.nodeController.getNodeByURL(request, reply));
    this.server.get('/nodes/count', (request, reply) => this.nodeController.countNodes(request, reply));
    this.server.get('/tree', (request, reply) => this.treeController.getTree(request, reply));
    this.server.get('/tree/ascii', (request, reply) => this.treeController.getTreeASCII(request, reply));
    this.server.get('/queue', (request, reply) => this.queueController.getQueueStatus(request, reply));
    this.server.post('/domain', (request, reply) => this.postController.sendURL(request, reply));
  }
}
