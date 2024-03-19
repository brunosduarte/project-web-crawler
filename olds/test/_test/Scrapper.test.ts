import { Scrapper } from '../Scrapper';
import { IScrapResult } from '../entities/IScrapResult';

describe('Scrapper', () => {
  let scrapper: Scrapper;

  beforeEach(() => {
    scrapper = new Scrapper();
  });

  afterEach(async () => {
    await scrapper.end();
  });

  describe('scrap', () => {
    it('should return the scraped result', async () => {
      const url = 'https://example.com';
      const expected: IScrapResult = {
        // Define the expected scrap result here
      };

      const result = await scrapper.scrap(url);

      expect(result).toEqual(expected);
    });

    it('should handle errors during scraping', async () => {
      const url = 'https://example.com';

      // Mock the getBrowser method to throw an error
      jest.spyOn(scrapper, 'getBrowser').mockRejectedValueOnce(new Error('Failed to get browser'));

      await expect(scrapper.scrap(url)).rejects.toThrow('Failed to get browser');
    });
  });
});



// import { Scrapper } from '../Scrapper';
// import { IScrapResult } from '../entities/IScrapResult';

// describe('Scrapper', () => {
//   let scrapper: Scrapper;

//   beforeEach(() => {
//     scrapper = new Scrapper();
//   });

//   afterEach(async () => {
//     await scrapper.end();
//   });

//   describe('scrap', () => {
//     it('should return a valid IScrapResult object', async () => {
//       const url = 'https://example.com';
//       const result: IScrapResult = await scrapper.scrap(url);

//       expect(result).toBeDefined();
//       expect(result.url).toBe(url);
//       expect(result.title).toBeDefined();
//       expect(result.description).toBeDefined();
//       expect(result.images).toBeDefined();
//       expect(result.links).toBeDefined();
//     });

//     it('should throw an error if the URL is invalid', async () => {
//       const url = 'invalid-url';
      
//       await expect(scrapper.scrap(url)).rejects.toThrow();
//     });
//   });

//   describe('end', () => {
//     it('should close the browser instance', async () => {
//       await scrapper.end();

//       // Assert that the browser instance is closed
//       // You can add your own assertion here based on your implementation
//     });
//   });
// });