import { ITreeNode } from "@/entities/ITreeNode";

export const parseData = (data: any): ITreeNode => {
  if (!data || typeof data !== 'object') {
    console.error('Invalid data format.');
    return { name: 'root', children: [] };
  }

  const domain = data.url || '';
  const rootNode: ITreeNode = { name: data.title || 'Root', children: [] };

  if (data.children && Array.isArray(data.children)) {
    rootNode.children = data.children.map((item: any) => buildTree(item, domain));
  }

  return rootNode;
};

function buildTree(node: any, parentDomain: string = ''): ITreeNode {
  const url = node.url || '';
  
  const nodeName = url ? url.replace(parentDomain, '').split('/').filter(Boolean).pop() : node.title;

  const treeNode: ITreeNode = {
    name: nodeName,
    url: node.url,
    title: node.title,
    done: node.done,
    children: []
  };

  if (node.children && Array.isArray(node.children)) {
    treeNode.children = node.children.map((child: any) => buildTree(child, parentDomain));
  }
  return treeNode;
}