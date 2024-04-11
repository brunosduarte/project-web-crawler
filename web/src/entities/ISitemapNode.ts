export interface ISiteMapNode {
  title: string
  url: string
  done: boolean
  children?: ISiteMapNode[] | never
}

export interface ISiteMapUrl {
  loc: string
  lastmod: string
}
