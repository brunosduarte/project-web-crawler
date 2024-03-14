import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { INode } from '@/domain/entities/INode';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { GetTreeUseCase } from '@/application/use-cases/GetTreeUseCase';
import { queue } from '@/infrastructure/app';
import { domainToASCII } from 'url';

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
    this.server.use(cors({
      origin: [`http://localhost:${this.options.port}`],
    }))
    //this.server.use(bodyParser.json());
    this.store = options.store;
    this.queue = options.queue;
    this.server
      .post('/domain', this.postDomain.bind(this))
      .get('/nodes/count', this.countNodes.bind(this))
      .get('/nodes', this.listNode.bind(this))
      .get('/tree', this.getTree.bind(this))
      .get('/tree/ascii', this.getTreeASCII.bind(this))
      .get('/nodes/:url', this.getNodeByURL.bind(this))
      .get('/queue', this.getQueueStatus.bind(this))
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

  async postDomain(req: Request, res: Response) {
    try {
      const domain  = req.parse(req.params.domain);
      // if (typeof domain !== 'string' || domain.trim() === '') {
      //   res.status(400).json({ status: 'error', message: 'Invalid data format' });
      //   return;
      // }
      //console.log('domain',domain);
      console.log('res',domain);
      res.status(200).json({ status: 'success', message: 'Starting crawl' });
      queue.add({ url: domain });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async listNode(req: Request, res: Response): Promise<void> {
    try {
      res.send(await this.store.list())
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async getNodeByURL(req: Request, res: Response): Promise<void> {
    try {
      const found = await this.store.findByURL(req.params.url);
      if(!found) {
        res.status(404).send();
      //TODO: handle errors
        return;
      }
      res.send(found);
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async getTree(req: Request, res: Response): Promise<void> {
    try {
      const usecase = new GetTreeUseCase(this.store);
      res.send(await usecase.execute());
    } catch (e) {
      console.error('Server.getTree', e);
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async getTreeASCII(req: Request, res: Response): Promise<void> {
    try {
      const usecase = new GetTreeUseCase(this.store);
      const tree = await usecase.execute();
      const iterateNode = (node: Partial<INode>, dept = 0): string => {
        if(!node.url) {
          return ''
        }
        const header = `${''.padStart(dept, '-')} ${node.url}\n`;
        const body = node.children?.map(child => iterateNode(child, dept + 1)).join('\n') || '';
        return header + body;
      }

      res.setHeader('Content-Type', 'text/plain').send(iterateNode(tree, 0));
    } catch (e) {
      console.error('Server.getTree', e);
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async countNodes(req: Request, res: Response): Promise<void> {
    try {
      const count = await this.store.count();
      res.send({ count });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }

  private async getQueueStatus(req: Request, res: Response): Promise<void> {
    try {
      const pending = await this.queue.size();
      const total = await this.store.count();
      res.send({ pending, total, percentDone: Math.round(100 * (total - pending)/total) });
    } catch (e) {
      // TODO: handle errors with middleware
      res.status(500).send();
    }
  }
}