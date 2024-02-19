import  express, { Request, Response } from 'express';
import { INodeStore } from './store/INodeStore';
import { ITaskQueue } from './queue/ITaskQueue';

type ProgressCallback = (progress: number) => void;

export interface IServerOptions {
  port: number;
  store: INodeStore;
  queue: ITaskQueue;
}

export class Server {
  private server: express.Express;
  private store: INodeStore;
  private queue: ITaskQueue;
  
  constructor(private options: IServerOptions) {
    this.server = express();
    this.store = options.store;
    this.queue = options.queue;
    this.server
      .get('/nodes/count', this.countNodes.bind(this))
      .get('/nodes', this.listNode.bind(this))
      .get('/nodes/:url', this.getNodeByURL.bind(this))
      .get('/queue', this.getQueueStatus.bind(this))
    // const startTime = Date.now();
    // const endTime = startTime + duration;
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

  private async listNode(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.store.listNodes())
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async getNodeByURL(req: Request, res: Response): Promise<void> {
    try {
      const found = await this.store.findNodeByURL(req.params.url);
      if(!found) {
        res.status(404).send();
        return;
      }
      res.send(found);
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async countNodes(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.store.countNodes();
      res.send({ count });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async getQueueStatus(req: Request, res: Response): Promise<void> {
    try {
      const size = await this.queue.size();
      const done = await this.store.countNodes();
      const total = size + done;
      res.send({ size, done, total, percentDone: Math.round(100 * done/total) });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }
}