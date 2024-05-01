interface ProgressBarProps {
  progress: number | unknown
}

export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className="w-full rounded-xl bg-blue-200 text-white ">
      <div
        role="progressbar"
        aria-label="Progress Bar"
        className="flex h-7 w-3/4 place-items-center justify-center rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 p-3 shadow-lg shadow-indigo-500/30"
        style={{ width: `${props.progress}%` }}
      >
        {`${props.progress}%`}
      </div>
    </div>
  )
}
