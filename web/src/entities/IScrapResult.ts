export interface IScrapItem {
  href: string
  type: 'link' | 'asset'
}

export interface IScrapPending {
  done: false
  url: string
}

export interface IScrapDone {
  done: true
  url: string
  href: string
  title: string
  items: IScrapItem[]
}
export type IScrapResult = IScrapPending | IScrapDone | void
