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
      }, { timeout: 60_000 });
    
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
        ignoreDefaultArgs: ['--enable-automation'],
        args: [
          '--no-sandbox',
          '--no-zygote',
          '--disable-setuid-sandbox',
          '--disable-infobars',
          '--enable-gpu',
          '--enable-webgl',
          '--window-size=1600,900',
          '--start-maximized',
        ],
        timeout: 60_000,
        protocolTimeout: 240_000,
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