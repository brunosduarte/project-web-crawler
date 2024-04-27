import { estimatedTimeRemaining } from './estimatedTimeRemaining'

describe('estimatedTimeRemaining', () => {
  it('should return formatted time when progress is 0', () => {
    const progressPercentage = 0
    const elapsedTime = 0

    const result = estimatedTimeRemaining(progressPercentage, elapsedTime)

    expect(result).toEqual('00:00:00')
  })

  it('should return "Fetching completed" when progress is 100', () => {
    const progressPercentage = 100
    const elapsedTime = 100

    const result = estimatedTimeRemaining(progressPercentage, elapsedTime)

    expect(result).toEqual('Fetching completed')
  })

  it('should return estimated remaining time when progress is between 0 and 100', () => {
    const progressPercentage = 50
    const elapsedTime = 60

    const result = estimatedTimeRemaining(progressPercentage, elapsedTime)

    expect(result).toEqual('00:01:00')
  })
})
