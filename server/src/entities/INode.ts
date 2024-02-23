export interface INode {
  done: boolean,
  url: string,
  title?: string,
  children?: INode[],
}
