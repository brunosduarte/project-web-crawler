interface ProgressBarProps {
  progress: number
}

export function ProgressBar(props: ProgressBarProps){
  return (
    <div className='bg-blue-200 rounded-xl w-80 text-white '>
      <div
        role='progressbar'
        aria-label='Progress Bar'
        aria-valuenow={props.progress}
        className='h-3 rounded-xl bg-green-500 w-3/4 p-3 place-items-center justify-center flex'
        style={{ width: `${props.progress}%` }}
      >
        {`${props.progress}%`}
      </div>
    </div>
  )
}
