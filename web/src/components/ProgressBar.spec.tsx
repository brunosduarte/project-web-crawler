import { render } from '@testing-library/react'

import { ProgressBar } from './ProgressBar'

describe('Loading test', () => {
  it('should display the loading', () => {
    const wrapper = render(<ProgressBar progress={49}/>)

    wrapper.debug

    const statusText = wrapper.getByDisplayValue(49)

    expect(statusText).toBeInTheDocument


  })
})