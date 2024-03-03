import { Scrapper } from '@/repositories/Scrapper'
import { ITaskQueue } from '@/queue/ITaskQueue'
import { INodeStore } from '@/store/INodeStore'
import { isSameDomain, isValidURL } from '@/helpers/validators'
import { ITask } from '@/entities/ITask'

export class Worker {
  private readonly scrapper = new Scrapper()
  constructor (private readonly queue: ITaskQueue, private readonly store: INodeStore) {
    queue.setWorker(async task => { await this.worker(task) })
  }

  
  private async worker ({ url }: ITask) {
    console.log('Processing task', url)
    const found = await this.store.findByURL(url)
    
    if (found?.done) {
      return
    }
    const res = await this.scrapper.scrap(url)

    if (!res) {
      return
    }

    await this.store.saveResult(res)
    const links = res.items
      ?.filter(item => item.type === 'link')
      .filter(item => isSameDomain(item.href, res.url))
      .map(item => item.href)

    const uniqueLinks = Array.from(new Set(links))

    const tasks = uniqueLinks.map(async href => { await this.addToQueue(href) })

    await Promise.all(tasks)
  }

  async addToQueue (url: string) {
    if (!isValidURL(url)) {
      return
    }

    const found = await this.store.findByURL(url)
    if (found) {
      return
    }
    await this.store.saveResult({ done: false, url })
    await this.queue.add({ url })
  }

  end () {
    this.scrapper.end()
  }
}
