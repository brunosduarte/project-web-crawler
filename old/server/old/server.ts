// import { scrap } from "./scrapper"; 

// const tree = new Map<string, string[]>()
// const visited = new Set<string>();
// const queue: string[] = [];
// const domain = 'https://microsoft.com/'

// queue.push(domain);

// function sameHostname(url: string) {
//   try {
//     const v = new URL(url);
//     const r = new URL(domain);
//     return v.hostname.includes(r.hostname);
//   } catch (e) {
//     return false;
//   }
// }

// async function processNext() {
//   const url = queue.shift();
//   if (!url || !sameHostname(url) || visited.has(url)) {
//     return;
//   }

//   console.log(`Remaining ${queue.length} Scrapping ${url}...`)
//   const pageUrls = await scrap(url);
//   visited.add(url);
//   // const unique = new Set(pageUrls.filter((url) => !tree.has(url)))
//   for (const item of pageUrls) {
//     const parents = tree.get(item);
//     if (parents){
//       parents.push(url);
//     } else {
//       tree.set(item, [url]);
//       console.log('ADD', item)
//       queue.push(item);
//     }
//   }
// }

// async function task() {
//   while (queue.length) {
//     await processNext();
//     console.log(tree)
//   }
//   console.log(tree)
// }

// task();
