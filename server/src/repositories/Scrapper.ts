import puppeteer, { Browser } from 'puppeteer';
import { IScrapDone, IScrapResult } from '@/entities/IScrapResult';
import { isValidURL, sanitizeURL } from '@/helpers/validators';
import { isNotNil } from '@/helpers/guards';

export class Scrapper {
  private browserPromise?: Promise<Browser>;

  constructor(){}

  async end() {
    if (!this.browserPromise) {
      return;
    }
    const browser = await this.getBrowser();
    console.log('finished');
    this.browserPromise = undefined;
    await browser.close();
  }

  async scrap(_url: string): Promise<IScrapDone | undefined> {
    const url = sanitizeURL(_url);
    if(!url) {
      return;
    }
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await page.goto(url);
      
      const data = await page.evaluate(() => {
        const title = document.title;
        const href = document.location.href;
        const links = Array.from(document.links).map(link => link.href);
        return { title, links, href }
      });
    
      return {
        done: true,
        url,
        title: data.title,
        items: data.links
          .map(sanitizeURL)
          .filter(isNotNil)
          .filter(link => link !== url)
          .map(href => ({ type: 'link', href }))
      };
    } catch (e) {
      console.error('Scraping failed', e);
      return undefined;
    } finally {
      await page.close();
    }
  }

  private async getBrowser(): Promise<Browser> {
    if (!this.browserPromise) {
      this.browserPromise = puppeteer.launch({
        headless: true,
        timeout: 990000,
        protocolTimeout: 990000,
        args: [
          '--disable-gpu',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--no-first-run',
          '--no-sandbox',
          '--no-zygote',
          '--deterministic-fetch',
          '--disable-features=IsolateOrigins',
          '--disable-site-isolation-trials',
        ],
      });
    }
    return await this.browserPromise;
  }
}