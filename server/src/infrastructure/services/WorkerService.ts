import { ITask } from '@/domain/valueObjects/ITask';
import { ITaskQueue } from '@/application/interfaces/ITaskQueue';
import { INodeStore } from '@/application/interfaces/INodeStore';
import { ScrapperService } from '@/infrastructure/services/ScrapperService';
import { isSameDomain, isValidURL } from '@/infrastructure/helpers/validators';

export class WorkerService {
  private scrapper = new ScrapperService();
  constructor(private queue: ITaskQueue, private store: INodeStore) {
    queue.setWorker(task => this.worker(task));
  }

  private async worker({ url }: ITask) {
    console.log('Processing: ', url);
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
      ?.filter((item: { type: string; }) => item.type === 'link')
      .filter((item: { href: string | undefined; }) => isSameDomain(item.href, res.url))
      .map((item: { href: any; }) => item.href);

    const uniqueLinks: string[] = Array.from(new Set(links));
    
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