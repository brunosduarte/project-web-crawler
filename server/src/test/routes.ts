// infrastructure/http/routes.ts
import { FastifyInstance } from 'fastify';
import { NodeController, TreeController, QueueController, PostController } from '@/infrastructure/http/controllers';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { INodeStore } from '@/application/interfaces/INodeStore';

export function registerRoutes(server, nodeController, treeController, queueController, postController): void {

  server.get('/nodes', nodeController.listNode);
  server.get('/nodes/:url', nodeController.getNodeByURL);
  server.get('/nodes/count', nodeController.countNodes);
  server.get('/tree', treeController.getTree);
  server.get('/tree/ascii', treeController.getTreeASCII);
  server.get('/queue', queueController.getQueueStatus);
  server.post('/domain', postController.sendURL);
}

//export function registerRoutes(server: FastifyInstance, queue: ITaskQueue, store: INodeStore): void {
// const nodeController = new NodeController(store);
// const treeController = new TreeController(store);
// const queueController = new QueueController(queue, store);
// const postController = new PostController();
