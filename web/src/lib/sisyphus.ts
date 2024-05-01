import * as sisyphus from '@enkidevs/axios-sisyphus'

export const config: sisyphus.Config = {
  retries: 3,
  // responseFailedFilter: (response) => false,
  // failedIterationCallback: (index) => {},
}
export const axiosConfig = {
  url: 'http://localhost:3000',
}

sisyphus.post(config, axiosConfig)
