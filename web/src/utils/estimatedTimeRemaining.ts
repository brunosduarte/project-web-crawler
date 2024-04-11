function formatTime(seconds: number): string {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
  return `Estimated remaining time: ${hours}:${minutes}:${remainingSeconds}`
}

export function estimatedTimeRemaining(
  progressPercentage: number,
  elapsedTime: number,
): string {
  if (progressPercentage <= 0) return formatTime(0)
  if (progressPercentage >= 100) return 'Fetching completed'

  // Estimate the total time based on current progress and elapsed time
  const estimatedTotalTime = elapsedTime * (100 / progressPercentage)
  const estimatedRemainingTime = estimatedTotalTime - elapsedTime

  return formatTime(estimatedRemainingTime)
}
