import { useState } from 'react'

import { usePostDomain } from '@/hooks'

export function App() {
  const [searchDomain, setSearchDomain] = useState('')
  const [isErrorMessage, setErrorMessage] = useState('')
  const [isError, setError] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const [isFetched, setFetched] = useState(false)

  const { mutate: sendURL, isSuccess: haveDomain } = usePostDomain()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleSearchDomain(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchDomain(event.target.value)
  }

  function handleGenerate() {
    try {
      if (isFetched) {
        setFetched(false)
        setSearchDomain('')
        setErrorMessage('')
      } else {
        if (searchDomain && !isError) {
          sendURL(searchDomain, {
            onError: (e) => {
              setError(true)
              setErrorMessage(e.message)
              console.log(searchDomain)
            },
          }) // TODO handle errors when POST fail
          setSearchDomain(searchDomain)
          console.log(searchDomain)
          return
        }
        setError(true)
        setErrorMessage('Insert the domain to crawl')
      }
    } catch (e: unknown) {
      setError(true)
      setErrorMessage((e as Error).message)
      console.error(e)
    } finally {
      setError(false)
    }
  }

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-auto ">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="https://www.enki.com"
          className="w-64 border-0 border-transparent bg-white text-gray-800 focus:ring-0"
          value={searchDomain}
          disabled={isFetching || isFetched}
          onChange={handleSearchDomain}
        />
        <button
          type="submit"
          aria-label="button generate"
          className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 shadow-lg shadow-indigo-500/30 hover:bg-blue-600 disabled:bg-blue-800"
          disabled={isFetching}
          onClick={handleGenerate}
        >
          Generate
        </button>
      </form>
    </div>
  )
}
