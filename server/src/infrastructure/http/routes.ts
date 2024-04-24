import { FastifyInstance } from 'fastify';
import { NodeController, TreeController, QueueController, PostController } from '@/infrastructure/http/controllers';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';

export function registerRoutes (server: FastifyInstance, store: INodeStore, queue: ITaskQueue) {
  const nodeController = new NodeController(store);
  const treeController = new TreeController(store);
  const queueController = new QueueController(queue, store);
  const postController = new PostController();

  server.get('/nodes', (req, res) => nodeController.listNode(req, res));
  server.get('/nodes/:url', (req, res) => nodeController.getNodeByURL(req, res));
  server.get('/tree', (req, res) => treeController.getTree(req, res));
  server.get('/tree/ascii', (req, res) => treeController.getTreeASCII(req, res));
  server.get('/queue', (req, res) => queueController.getQueueStatus(req, res));
  server.post('/domain', (req, res) => postController.sendURL(req, res));
}