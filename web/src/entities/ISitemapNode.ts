export interface ISiteMapNode {
  title: string
  url: string
  done: boolean
  children?: ISiteMapNode[] | never
}
