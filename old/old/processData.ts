// path/filename: src/buildObjectTree.ts
import { locs } from '../storage/data.json';

const domain = 'mediaman.com'

type UrlNode = {
  name: string;
  children: Map<string, UrlNode>;
};

const createNode = (name: string): UrlNode => ({
  name,
  children: new Map<string, UrlNode>(),
});

const addUrlToTree = (root: UrlNode, urlParts: string[], index = 0) => {
  if (index >= urlParts.length) return;

  const part = urlParts[index];
  if (!root.children.has(part)) {
    root.children.set(part, createNode(part));
  }

  addUrlToTree(root.children.get(part)!, urlParts, index + 1);
};

const buildTreeFromUrls = (urlObjects: { url: string }[]): UrlNode => {
  const root = createNode(domain);

  urlObjects.forEach(({ url }) => {
    const parts = url.split('/').filter(part => part.length > 0 && part !== domain);
    addUrlToTree(root, parts);
  });

  return root;
};

export const tree = buildTreeFromUrls(locs);

