import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { PostController, NodeController, TreeController, QueueController } from '@/infrastructure/http/controllers';

export interface IServerOptions {
  port: number;
  store: INodeStore;
  queue: ITaskQueue;
}

export class Server {
  private server: express.Express;
  private store: INodeStore;
  private queue: ITaskQueue;

  private nodeController: NodeController;
  private treeController: TreeController;
  private postController: PostController;
  private queueController: QueueController;
  
  constructor(private options: IServerOptions) {
    this.server = express();
    this.server.use(cors())
    this.server.use(bodyParser.json());

    this.store = options.store;
    this.queue = options.queue;

    this.nodeController = new NodeController(this.store);
    this.treeController = new TreeController(this.store);
    this.postController = new PostController();
    this.queueController = new QueueController(this.queue, this.store);

    this.server
    .get('/nodes', (req, res) => this.nodeController.listNode(req, res))
    .get('/nodes/:url', (req, res) => this.nodeController.getNodeByURL(req, res))
    .get('/nodes/count', (req, res) => this.nodeController.countNodes(req, res))
    .get('/tree', (req, res) => this.treeController.getTree(req, res))
    .get('/tree/ascii', (req, res) => this.treeController.getTreeASCII(req, res))
    .get('/queue', (req, res) => this.queueController.getQueueStatus(req, res))
    .post('/domain', (req, res) => this.postController.sendURL(req, res))
    
  }

  getPort(): number {
    return this.options.port;
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server.listen(this.options.port, () => {
          resolve()
        });
      } catch (e) {
        reject(e);
      }
    })
  }
}
