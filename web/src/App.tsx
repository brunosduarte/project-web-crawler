/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import '@/styles/global.css'

import { MagnifyingGlass } from 'phosphor-react'
import { useEffect, useState } from 'react'

import { ElapsedCrawling } from '@/components/ElapsedCrawling'
import { Loading } from '@/components/Loading'
import { ProgressBar } from '@/components/ProgressBar'
import { Tree } from '@/components/Tree'
import { ISiteMapNode } from '@/entities/ISitemapNode'
import { usePostDomain, useStatus, useTree } from '@/hooks'
import { exportSitemap } from '@/utils/generateSitemap'
import { parseData } from '@/utils/parseData'

export function App() {
  const [searchDomain, setSearchDomain] = useState('')
  const [isErrorMessage, setErrorMessage] = useState('')
  const [isError, setError] = useState(false)
  const [isFetching, setFetching] = useState(false)
  const [isFetched, setFetched] = useState(false)

  const { mutate: sendURL, isSuccess: haveDomain } = usePostDomain()
  const { data: status } = useStatus({ haveDomain })
  const { data: treeJSON } = useTree({ isFetched })

  const treeData = parseData(treeJSON)

  function isValidHttpURL(url: string) {
    const pattern = new RegExp(
      '^(http(s)?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i', // fragment locator
    )
    return pattern.test(url)
  }

  function ensureWebAddress(url: string) {
    if (isValidHttpURL(url)) {
      setError(false)
      setErrorMessage('')
      return url
    } else {
      setError(true)
      setErrorMessage('Insert a valid web address')
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    ensureWebAddress(searchDomain)
  }

  function handleSearchDomain(event: React.ChangeEvent<HTMLInputElement>) {
    ensureWebAddress(searchDomain)
    setSearchDomain(event.target.value)
  }

  function handleGenerate() {
    try {
      if (isFetched) {
        setError(false)
        setFetched(false)
        setSearchDomain('')
        setErrorMessage('')
      } else {
        if (searchDomain && !isError) {
          sendURL(searchDomain, {
            onError: (e) => {
              setError(true)
              setErrorMessage('Error: ' + (e as Error).message)
            },
            onSuccess: () => {
              setError(false)
              setErrorMessage('')
              setSearchDomain(searchDomain)
            },
          })
        }
        setError(true)
        setErrorMessage('Insert the domain to crawl')
      }
    } catch (e: unknown) {
      setError(true)
      setErrorMessage('Error during URL submission: ' + (e as Error).message)
      console.error('Error during URL submission: ', e)
    } finally {
      setError(false)
      setErrorMessage('')
    }
  }

  function handleExportSitemap() {
    try {
      exportSitemap(treeJSON as ISiteMapNode)
    } catch (e) {
      setError(true)
      setErrorMessage('Error during XML export: ' + (e as Error).message)
      console.error('Error during XML export: ', e)
    } finally {
      setError(false)
    }
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
    setFetched(progress >= 100)
  }, [status?.percentDone])

  return (
    <div className="flex h-screen w-full flex-col items-center overflow-y-auto ">
      <header>
        <h1
          aria-label="site mapper"
          className="mt-20 text-6xl font-bold text-white shadow-slate-500 drop-shadow-[2px_2px_var(--tw-shadow-color)]"
        >
          SiteMapper
        </h1>
        <h2 className="mt-3 text-xs text-gray-200">
          Generate a complete sitemap of a specific domain
        </h2>
      </header>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex w-fit flex-col justify-center align-middle">
          <label
            aria-label="input domain to crawl"
            htmlFor="insert-domain"
            className="mt-10 flex w-80 items-center gap-2 self-center rounded-full bg-white p-2 pl-4"
          >
            <MagnifyingGlass />
            <input
              type="text"
              id="insert-domain"
              placeholder="e.g. https://www.enki.com"
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
              <p>
                <br />
              </p>
            )}
          </div>

          <div className="flex flex-wrap justify-center align-middle">
            <button
              aria-label="button generate"
              type="submit"
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
                aria-label="button export sitemap"
                type="button"
                className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 shadow-lg shadow-indigo-500/30  hover:bg-blue-600 disabled:bg-blue-800"
                onClick={handleExportSitemap}
              >
                Export XML
              </button>
            )}
          </div>
        </div>
      </form>
      <div className="h-full w-full">
        {isFetching ? (
          <div className="flex h-full flex-col justify-evenly p-20">
            <ProgressBar
              aria-label="progress bar"
              progress={calculateProgress() || 0}
            />
            <ElapsedCrawling
              aria-label="elapsed crawling"
              total={itemsTotal() || 0}
              pending={itemsPending() || 0}
            />
          </div>
        ) : (
          isFetched && <Tree dataTree={treeData as ISiteMapNode} />
        )}
      </div>
      <footer className="flex flex-row align-middle text-sm text-slate-400">
        <p>©2024 BsD Systems</p>
      </footer>
    </div>
  )
}
