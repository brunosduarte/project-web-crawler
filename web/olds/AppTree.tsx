import { Tree } from '@/components/Tree';
import treeData from '@/storage/tree.json';

export function AppTree() {
  return (
    <div>
      <Tree tree={treeData} /> 
    </div>
  )
}