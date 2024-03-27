import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'

import { App } from '@/App'

import { queryClient } from './lib/react-query'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
)
