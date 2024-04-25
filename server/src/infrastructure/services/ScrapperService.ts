import puppeteer, { Browser } from 'puppeteer';
import { isNotNil } from '@/infrastructure/helpers/guards';
import { sanitizeURL } from '@/infrastructure/helpers/validators';
import { IScrapResult } from '@/domain/entities/IScrapResult';

export class ScrapperService {
  private browserPromise?: Promise<Browser>;

  constructor(){}
  
  async scrap(_url: string | URL): Promise<IScrapResult> {
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
      }, { timeout: 0 })
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

  public async getBrowser(): Promise<Browser> {
    if (!this.browserPromise) {
      this.browserPromise = puppeteer.launch({
        headless: 'shell',
        ignoreHTTPSErrors: true,
        defaultViewport: null,
        // ignoreDefaultArgs: ['--enable-automation'],
        args: [
          '--enable-automation',
          "--no-first-run",
          '--no-sandbox',
          '--no-zygote',
          '--disable-gpu',
          '--disable-webgl',
          '--disable-dev-shm-usage',
          '--disable-setuid-sandbox',
          '--disable-features=IsolateOrigins',
          '--disable-site-isolation-trials',
          "--disable-accelerated-2d-canvas",
          '--disable-infobars',
          '--deterministic-fetch',
          '--window-size=1600,900',
        ],
        timeout: 0,
        protocolTimeout: 0,
      });
    }
    return await this.browserPromise;
  }

  async end() {
    if (!this.browserPromise) {
      return;
    }
    const browser = await this.getBrowser();
    console.log('Finished!');
    this.browserPromise = undefined;
    await browser.close();
  }
}