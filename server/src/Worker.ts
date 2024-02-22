import { ITask } from './entities/ITask';
import { INodeStore } from './store/INodeStore';
import { MemoryNodeStore } from './store/MemoryNodeStore';
import { Scrapper } from './Scrapper';
import { MemoryTaskQueue } from './queue/MemoryTaskQueue';
import { ITaskQueue } from './queue/ITaskQueue';

export class Worker {
  private scrapper = new Scrapper();
  constructor(private queue: ITaskQueue, private store: INodeStore) {
    queue.setWorker(task => this.worker(task));
  }

  private async worker(task: ITask) {
    console.log('Processing task', task.url);
    const found = await this.store.findNodeByURL(task.url);
    if (found) {
      console.log('alreadyHave', found);
      return;
    }
    const res = await this.scrapper.scrap(task.url);
    await this.store.saveNode(res);
  
    await Promise.allSettled(res.foundUrls.map(url => this.addToQueue(url)))
  }

  async addToQueue(url: string) {
    const found = await this.store.findNodeByURL(url);
    if (found)  {
      console.log('isOnList', url)
      return
    }
    if (!url.startsWith('https://www.correios.com.br/',0))  {
      console.log('notDomain', url)
      return
    }
    console.log('Adding to queue', url);
    await this.queue.add({ url });
  }
}
