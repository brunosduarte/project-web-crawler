export function estimatedTimeRemaining(
  totalContentSize: number,
  updateInterval: number,
): string {
  const startTime = performance.now()
  let loadedContentSize = 0

  const loadingInterval = setInterval(() => {
    loadedContentSize += Math.random() * 10

    const elapsedTime = (performance.now() - startTime) / 1000

    if (loadedContentSize < totalContentSize) {
      const remainingTimeInSeconds =
        ((totalContentSize - loadedContentSize) / loadedContentSize) *
        elapsedTime
      const formattedRemainingTime = formatTime(remainingTimeInSeconds)
      console.log(formattedRemainingTime)
      return formattedRemainingTime
    } else {
      console.log('Content loading completed.')
      clearInterval(loadingInterval)
    }
  }, updateInterval)

  return formatTime(0) // Placeholder return, adjust as needed based on actual app integration
}

function formatTime(seconds: number): string {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, '0')
  return `Estimated remaining time: ${hours}:${minutes}:${remainingSeconds}`
}
