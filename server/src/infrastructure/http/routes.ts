// import { FastifyInstance } from 'fastify';
// import { NodeController, TreeController, QueueController, PostController } from '@/infrastructure/http/controllers';
// import { INodeStore } from '@/application/interfaces/INodeStore';
// import { ITaskQueue } from '@/application/interfaces/ITaskQueue';

// export function registerRoutes (server: FastifyInstance, store: INodeStore, queue: ITaskQueue) {
//   const nodeController = new NodeController(store);
//   const treeController = new TreeController(store);
//   const queueController = new QueueController(queue, store);
//   const postController = new PostController();

//   server.get('/nodes', nodeController.listNode);
//   server.get('/nodes/:url', nodeController.getNodeByURL);
//   server.get('/nodes/count', nodeController.countNodes);
//   server.get('/tree', treeController.getTree);
//   server.get('/tree/ascii', treeController.getTreeASCII);
//   server.get('/queue', queueController.getQueueStatus);
//   server.post('/domain', postController.sendURL);
// }
