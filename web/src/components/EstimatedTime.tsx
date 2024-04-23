import { useEffect, useState } from 'react'

import { estimatedTimeRemaining } from '@/utils/estimatedTimeRemaining'

interface EstimatedTimeProps {
  total: number | undefined
  pending: number | undefined
}

export function EstimatedTime({ total, pending }: EstimatedTimeProps) {
  const [timeRemaining, setTimeRemaining] = useState('Calculating...')
  const [startTime, setStartTime] = useState<Date | null>(null)

  useEffect(() => {
    if (typeof total !== 'undefined' && typeof pending !== 'undefined') {
      if (startTime === null) {
        setStartTime(new Date())
      }

      const progress = ((total - pending) / total) * 100
      const elapsedTime =
        (new Date().getTime() -
          (startTime?.getTime() || new Date().getTime())) /
        1000

      const formattedTimeRemaining = estimatedTimeRemaining(
        progress,
        elapsedTime,
      )
      setTimeRemaining(formattedTimeRemaining)
    }
  }, [total, pending, startTime])

  return (
    <div className="mt-10 flex flex-col items-center text-sm text-slate-100">
      <p>Estimated remaining time:</p>
      <p className="ml-2">{timeRemaining}</p>
    </div>
  )
}
