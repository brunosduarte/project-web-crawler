import puppeteer, { Browser } from 'puppeteer';
import { IScrapResult } from './entities/IScrapResult';

export class Scrapper {
  private browserPromise?: Promise<Browser>;

  constructor(){}

  async end() {
    if (!this.browserPromise) {
      return;
    }
    const browser = await this.getBrowser();
    console.log('finished', browser);
    await browser.close();
  }

  async scrap(url: string): Promise<IScrapResult> {
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();
      await page.goto(url);

      const data = await page.evaluate(() => {
        const details = Array.from(document.links).map(link => {
          const loc = link.href;
          const lastmod = document.lastModified;
          const title = document.title;
          //TODO: more assets
          return { loc, lastmod, title };
        });
        return details;
      });
      
      await page.close();

      const domain = new URL(url).hostname;
      const result: IScrapResult = { [domain]: data };

      return result;
    } catch (e) {
      console.error('Scraping failed', e);
      return {};
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