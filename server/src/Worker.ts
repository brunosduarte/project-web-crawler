import { ITask } from './entities/ITask';
import { Scrapper } from './Scrapper';
import { ITaskQueue } from './queue/ITaskQueue';
import { INodeStore } from './store/INodeStore';
import { IScrapResult } from './entities/IScrapResult';

export class Worker {
  private scrapper = new Scrapper();
  constructor(private queue: ITaskQueue, private store: INodeStore) {
    queue.setWorker(task => this.worker(task));
  }

  private async worker(task: ITask) {
    console.log('Processing task', task.url);
    const res: IScrapResult = await this.scrapper.scrap(task.url);
    const nodes = await this.store.listNodes();
    const existingUrls = nodes.flatMap(node => node[Object.keys(node)[0]].map(detail => detail.loc));

    if (existingUrls.includes(task.url)) {
      //console.log('URL is already in the task process:', task.url);
      return;
    }
    
    Object.entries(res).forEach(async ([domain, details]) => {
      await this.store.saveNode(domain, details);
      details.forEach(detail => {
        //console.log('includes', detail.loc);
        this.addToQueue(detail.loc);
      });
    });
  }
  async addToQueue(url: string) {
    const nodes = await this.store.listNodes();
    const existingUrls = nodes.flatMap(node => node[Object.keys(node)[0]].map(detail => detail.loc));
    
    // if (existingUrls.includes(url)) {
    //   console.log('URL is already in the founded links:', url);
    //   return;
    // }

    if (!url.includes('microsoft.com/')) {
        return;
    }

    //console.log('Adding to queue:', url);
    await this.queue.add({ url });
  }
}