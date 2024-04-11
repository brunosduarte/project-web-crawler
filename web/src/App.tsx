import '@/styles/global.css'

import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { Loading } from '@/components/Loading'
import { ProgressBar } from '@/components/ProgressBar'
import { Tree } from '@/components/Tree'
import { ISiteMapNode } from '@/entities/ISitemapNode'
import { useMutate, useStatus, useTree } from '@/hooks'
import dataJSON from '@/storage/tree.json'
import { exportSitemap } from '@/utils/generateSitemap'
import { parseData } from '@/utils/parseData'

export function App() {
  const [searchDomain, setSearchDomain] = useState('')
  const [isErrorMessage, setErrorMessage] = useState('')
  const [isErrorTyping, setErrorTyping] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const [isFetched, setFetched] = useState(false)

  const { mutate: sendURL, isSuccess: haveDomain } = useMutate()
  const { data: status } = useStatus({ haveDomain })
  const { data: treeJSON } = useTree({ haveDomain })

  const treeData = parseData(dataJSON)

  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/
  // /^(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/

  function ensureWebAddress(url: string) {
    setErrorTyping(false)
    setErrorMessage('')
    if (regex.test(url)) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`
      }
      return url
    } else {
      setErrorTyping(true)
      setErrorMessage('Insert a valid web address')
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  function handleSearchDomain(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchDomain(event.target.value)
    ensureWebAddress(searchDomain)
  }

  function handleGenerate() {
    try {
      if (isFetched) {
        setFetched(false)
        setSearchDomain('')
        setErrorMessage('')
        // console.log(treeJSON)
      } else {
        if (searchDomain && !isErrorTyping) {
          sendURL(searchDomain)
          setSearchDomain(searchDomain)
          console.log(searchDomain)
          return
        }
        setErrorTyping(true)
        setErrorMessage('Insert the domain to crawl')
      }
    } catch (e: unknown) {
      console.error(e)
      setErrorMessage((e as Error).message)
    }
  }

  function handleExportSitemap() {
    exportSitemap(treeJSON)
  }

  function calculateProgress() {
    if (!haveDomain || !status) {
      return 0
    }
    return status.percentDone
  }

  useEffect(() => {
    const progress = calculateProgress()
    setFetching(progress > 0 && progress < 100)
    setFetched(progress === 100)
  }, [calculateProgress, haveDomain, status.percentDone])

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-auto ">
      <h1 className="mt-20 text-6xl font-bold text-white">SiteMapper</h1>
      <h2 className="mt-2 text-xs text-gray-200">
        Generate a complete sitemap of a specific domain
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex w-fit flex-col justify-center align-middle">
          <label
            htmlFor="insert-domain"
            className="flex flex-row place-items-center justify-center"
          >
            <div className="mt-10 flex items-center gap-2 rounded-full bg-white p-2 pl-4">
              <MagnifyingGlass />
              <input
                type="text"
                id="insert-domain"
                placeholder="test.com"
                className="border-0 border-transparent text-gray-800"
                value={searchDomain}
                disabled={isFetching || isFetched}
                onChange={handleSearchDomain}
              />
            </div>
          </label>

          <div className="mt-1 flex justify-center text-xs text-gray-400">
            {isErrorTyping ? (
              <p className="text-red-300">{isErrorMessage}</p>
            ) : searchDomain.length === 0 ? (
              'Insert the domain to crawl'
            ) : (
              <br />
            )}
          </div>

          <div className="flex flex-wrap justify-center align-middle">
            <button
              type="submit"
              className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 hover:bg-blue-600 disabled:bg-blue-800"
              disabled={isFetching}
              onClick={handleGenerate}
            >
              {isFetching ? (
                <Loading />
              ) : isFetched ? (
                'Re-Generate'
              ) : (
                'Generate'
              )}
            </button>
            {isFetched && (
              <button
                type="button"
                className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 hover:bg-blue-600 disabled:bg-blue-800"
                onClick={handleExportSitemap}
              >
                Export XML
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col place-items-center justify-center">
          {isFetching ? (
            <div className="mt-8">
              <ProgressBar progress={calculateProgress() || 0} />
            </div>
          ) : (
            isFetched && <Tree dataTree={treeData as ISiteMapNode} />
          )}
        </div>
      </form>
    </div>
  )
}
