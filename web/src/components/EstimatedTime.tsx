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

  if (
    typeof total === 'undefined' ||
    typeof pending === 'undefined' ||
    pending === 0
  ) {
    return <div className="mt-10 text-sm">Fetching completed</div>
  }

  return <div className="mt-10 text-sm text-slate-100">{timeRemaining}</div>
}
