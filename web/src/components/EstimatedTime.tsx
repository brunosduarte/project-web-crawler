import React, { useEffect, useState } from 'react'

import { estimatedTimeRemaining } from '@/utils/estimatedTimeRemaining'

interface EstimatedTimeProps {
  total: number | undefined
  pending: number | undefined
}

export function EstimatedTime({ total, pending }: EstimatedTimeProps) {
  const [timeRemaining, setTimeRemaining] = useState('Calculating...')

  useEffect(() => {
    if (
      typeof total !== 'undefined' &&
      typeof pending !== 'undefined' &&
      pending !== 0
    ) {
      const estimatedTime = total - pending // Assuming `total - pending` gives the correct estimated time
      const formattedTimeRemaining = estimatedTimeRemaining(estimatedTime, 1000)
      setTimeRemaining(formattedTimeRemaining) // Update state with the formatted time
    }
  }, [total, pending]) // Dependency array to re-run effect when total or pending changes

  // Check for undefined or zero conditions before rendering the component
  if (
    typeof total === 'undefined' ||
    typeof pending === 'undefined' ||
    pending === 0
  ) {
    return <div className="mt-10 text-sm">Calculating...</div>
  }

  // Render the component with the time remaining
  return <div className="mt-10 text-sm text-slate-100">{timeRemaining}</div>
}
