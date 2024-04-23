export function Loading() {
  return (
    <div className="flex h-6 w-10 items-center justify-center gap-2 overflow-hidden">
      <div className="h-2 w-4 animate-pulse rounded-full bg-blue-200 [animation-delay:0.25s]"></div>
      <div className="h-2 w-4 animate-pulse rounded-full bg-blue-200 [animation-delay:-0.25s]"></div>
      <div className="h-2 w-4 animate-pulse rounded-full bg-blue-200"></div>
    </div>
  )
}
// import { CircleNotch } from 'phosphor-react'
// <div className="flex h-6 w-6 items-center justify-center overflow-hidden">
//   <CircleNotch weight="bold" className="h-4 w-4 animate-spin" />
// </div>
