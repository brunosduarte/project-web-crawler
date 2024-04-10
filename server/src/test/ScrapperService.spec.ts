import { ScrapperService } from './ScrapperService';

describe('ScrapperService', () => {
  let scrapperService: ScrapperService;

  beforeEach(() => {
    scrapperService = new ScrapperService();
  });

  afterEach(async () => {
    await scrapperService.end();
  });

  describe('scrap', () => {
    it('should return the scraped data if the URL is valid', async () => {
      const url = 'https://example.com/';
      const result = await scrapperService.scrap(url);

      expect(result).toBeDefined();
      expect(result.done).toBe(true);
      expect(result.url).toBe(url);
      expect(result.title).toBeDefined();
      expect(result.items).toBeDefined();
    });

    it('should return undefined if the URL is invalid', async () => {
      const url = 'invalid-url';
      const result = await scrapperService.scrap(url);

      expect(result).toBeUndefined();
    });
  });

  // describe('end', () => {
  //   it('should close the browser', async () => {
  //     const spy = await vi.spyOn(scrapperService, 'getBrowser');
  //     await scrapperService.end();

  //     expect(spy).toHaveBeenCalled();
  //     expect(spy).toHaveReturnedWith(expect.any(Promise));
  //   });
  // });
});