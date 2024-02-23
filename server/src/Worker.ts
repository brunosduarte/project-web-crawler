import { ITask } from './entities/ITask';
import { Scrapper } from './Scrapper';
import { ITaskQueue } from './queue/ITaskQueue';
import { INodeStore } from './store/INodeStore';
import { isSameDomain, isValidURL } from './helpers/validators';
export class Worker {
  private scrapper = new Scrapper();
  constructor(private queue: ITaskQueue, private store: INodeStore) {
    queue.setWorker(task => this.worker(task));
  }

  private async worker({ url }: ITask) {
    console.log('Processing task', url);
    const found = await this.store.findByURL(url);
    if(found?.done) {
      return;
    }
    const res = await this.scrapper.scrap(url);

    if(!res) {
      return;
    }

    await this.store.saveResult(res);
    const links = res.items
      ?.filter(item => item.type === 'link')
      .filter(item => isSameDomain(item.href, res.url))
      .map(item => item.href);

    const uniqueLinks = Array.from(new Set(links));
    
    const tasks = uniqueLinks.map(href => this.addToQueue(href))

    await Promise.all(tasks);
  }

  async addToQueue(url: string) {
    if(!isValidURL(url)) {
      return;
    }

    const found = await this.store.findByURL(url);
    if(found) {
      return;
    }
    await this.store.saveResult({ done: false, url })
    await this.queue.add({ url });
  }

  end() {
    this.scrapper.end();
  }
}