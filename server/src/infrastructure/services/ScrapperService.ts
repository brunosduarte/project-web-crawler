import puppeteer, { Browser } from 'puppeteer';
import { IScrapDone, IScrapResult } from '@/domain/entities/IScrapResult';
import { isValidURL, sanitizeURL } from '@/shared/helpers/validators';
import { isNotNil } from '@/shared/helpers/guards';

export class ScrapperService {
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

  async scrap(_url: string | URL): Promise<IScrapDone | any> {
    const url = sanitizeURL(_url);
    if(!url) {
      return;
    }
    const browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await page.setViewport({width: 1920, height: 1080});
      await page.setRequestInterception(true);
      page.on('request', interceptedRequest => {
        if (interceptedRequest.isInterceptResolutionHandled()) return;
        // interceptedRequest.abort('failed');
        if (
          interceptedRequest.url().endsWith('.png') ||
          interceptedRequest.url().endsWith('.jpg') ||
          interceptedRequest.url().endsWith('.svg') ||
          interceptedRequest.url().endsWith('.pdf') ||
          interceptedRequest.url().endsWith('.csv') ||
          interceptedRequest.url().endsWith('.zip') ||
          interceptedRequest.url().endsWith('.exe') ||
          interceptedRequest.url().endsWith('.bat')
          )
            interceptedRequest.abort();
        else interceptedRequest.continue();
      });  
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
        headless: 'shell',
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