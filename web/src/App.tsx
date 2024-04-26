/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
// import dataJSON from '@/storage/tree.json'
import '@/styles/global.css'

import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { ElapsedCrawling } from '@/components/ElapsedCrawling'
import { Loading } from '@/components/Loading'
import { ProgressBar } from '@/components/ProgressBar'
import { Tree } from '@/components/Tree'
import { ISiteMapNode } from '@/entities/ISitemapNode'
import { useSetDomain, useStatus, useTree } from '@/hooks'
import { exportSitemap } from '@/utils/generateSitemap'
import { parseData } from '@/utils/parseData'

export function App() {
  const [searchDomain, setSearchDomain] = useState('')
  const [isErrorMessage, setErrorMessage] = useState('')
  const [isError, setError] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const [isFetched, setFetched] = useState(false)

  const { mutate: sendURL, isSuccess: haveDomain } = useSetDomain()
  const { data: status } = useStatus({ haveDomain })
  const { data: treeJSON } = useTree({ haveDomain })

  const treeData = parseData(treeJSON)

  const regex =
    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/

  function ensureWebAddress(url: string) {
    setError(false)
    setErrorMessage('')
    if (regex.test(url)) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`
      }
      return url
    } else {
      setError(true)
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
      } else {
        if (searchDomain && !isError) {
          sendURL(searchDomain)
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

  function handleExportSitemap() {
    exportSitemap(treeJSON as ISiteMapNode)
  }

  function calculateProgress() {
    if (!haveDomain || !status) {
      return 0
    }
    return status.percentDone
  }

  function itemsTotal() {
    return status?.total
  }
  function itemsPending() {
    return status?.pending
  }

  useEffect(() => {
    const progress = calculateProgress()
    itemsTotal()
    itemsPending()
    setFetching(progress > 0 && progress < 100)
    setFetched(progress === 100)
  }, [status?.percentDone, haveDomain])

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-auto ">
      <h1
        aria-label="SiteMapper"
        className="mt-20 text-6xl font-bold text-white shadow-slate-500 drop-shadow-[2px_2px_var(--tw-shadow-color)]"
      >
        SiteMapper
      </h1>
      <h2 className="mt-3 text-xs text-gray-200">
        Generate a complete sitemap of a specific domain
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex w-fit flex-col justify-center align-middle">
          <label
            htmlFor="insert-domain"
            aria-label="Input Domain to Crawl"
            className="mt-10 flex w-80 items-center gap-2 rounded-full bg-white p-2 pl-4"
          >
            <MagnifyingGlass />
            <input
              type="text"
              id="insert-domain"
              placeholder="https://www.enki.com"
              className="w-64 border-0 border-transparent bg-white text-gray-800 focus:ring-0"
              value={searchDomain}
              disabled={isFetching || isFetched}
              onChange={handleSearchDomain}
            />
          </label>

          <div className="mt-1 flex justify-center text-xs text-gray-400">
            {isError ? (
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
              aria-label="Button Generate"
              className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 shadow-lg shadow-indigo-500/30 hover:bg-blue-600 disabled:bg-blue-800"
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
                aria-label="Button Export Sitemap"
                className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 shadow-lg shadow-indigo-500/30  hover:bg-blue-600 disabled:bg-blue-800"
                onClick={handleExportSitemap}
              >
                Export XML
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col place-items-center justify-center">
          {isFetching ? (
            <div className="mt-8 flex flex-col items-center justify-center">
              <ProgressBar progress={calculateProgress() || 0} />
              <ElapsedCrawling
                total={itemsTotal() || 0}
                pending={itemsPending() || 0}
              />
            </div>
          ) : (
            isFetched && <Tree dataTree={treeData as ISiteMapNode} />
          )}
        </div>
      </form>
    </div>
  )
}
