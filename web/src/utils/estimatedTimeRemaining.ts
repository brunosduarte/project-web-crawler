export function estimatedTimeRemaining(
  totalContentSize: number,
  updateInterval: number,
): void {
  const startTime = performance.now()
  let loadedContentSize = 0

  const loadingInterval = setInterval(() => {
    // Simulate loading chunk of content
    loadedContentSize += Math.random() * 10

    const elapsedTime = (performance.now() - startTime) / 1000

    // Calculate remaining time based on the ratio of loaded content to total content and elapsed time
    if (loadedContentSize < totalContentSize) {
      const remainingTimeInSeconds =
        ((totalContentSize - loadedContentSize) / loadedContentSize) *
        elapsedTime
      const formattedRemainingTime = formatTime(remainingTimeInSeconds)
      console.log(`Estimated remaining time: ${formattedRemainingTime}`)
    } else {
      console.log('Content loading completed.')
      clearInterval(loadingInterval)
    }
  }, updateInterval)
}

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${hours}:${minutes}:${remainingSeconds} seconds`
}

// Example usage: Simulate loading 100 units of content, updating every second
estimatedTimeRemaining(100, 1000)
