export interface ITreeNode {
  name: string;
  url?: string;
  title?: string;
  done?: boolean;
  children: ITreeNode[];
}


