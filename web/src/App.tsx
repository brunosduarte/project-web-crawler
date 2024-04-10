/* eslint-disable @typescript-eslint/no-explicit-any */
import '@/styles/global.css'

import { MagnifyingGlass } from 'phosphor-react'
import { useState } from 'react'

import { Loading } from '@/components/Loading'
// import { ProgressBar } from '@/components/ProgressBar'
import { Tree } from '@/components/Tree'
import dataJSON from '@/storage/tree.json'
import { exportSitemap } from '@/utils/generateSitemap'
import { parseData } from '@/utils/parseData'

import { ISiteMapNode } from './entities/ISitemapNode'
import { useMutate, useResults, useStatus } from './hooks'

export function App() {
  const [searchDomain, setSearchDomain] = useState('')
  const [isErrorTyping, setErrorTyping] = useState(false)
  const [isErrorMessage, setErrorMessage] = useState('')

  const treeData = parseData(dataJSON)
  const { data: results, isFetching } = useResults()
  const { data: status } = useStatus()
  const { mutate: sendURL } = useMutate()

  // const regexDomain =
  //   /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/
  // ^((http|https)://)?([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}$';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

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
                // pattern={RegExp(regexDomain)} // Convert regexDomain to string
                onChange={(event) => setSearchDomain(event.target.value)}
              />
            </div>
          </label>

          <div className="mt-1 flex justify-center text-xs text-gray-400">
            {isErrorTyping ? (
              <p className="text-red-300">{isErrorTyping}</p>
            ) : isErrorMessage ? (
              <p className="text-red-300">{isErrorMessage}</p>
            ) : searchDomain.length === 0 ? (
              'Insert the domain to crawl'
            ) : (
              <p className="text-transparent">{`.`}</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center align-middle">
            <button
              type="submit"
              className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 hover:bg-blue-600 disabled:bg-blue-800"
              onClick={async () => {
                try {
                  if (searchDomain) {
                    sendURL(searchDomain)
                    setSearchDomain(searchDomain)
                    console.log(results)
                  }
                  setErrorMessage('Insert the domain to crawl')
                } catch (e: any) {
                  // isError
                  console.error(e)
                  setErrorTyping(e.message)
                  setErrorMessage(e.message)
                }
              }}
            >
              {isFetching ? <Loading /> : 'Generate'}
            </button>
            <button
              type="button"
              className="m-4 flex w-36 place-items-center justify-center rounded-xl bg-blue-500 p-2 text-slate-300 hover:bg-blue-600 disabled:bg-blue-800"
              onClick={() => {
                exportSitemap(dataJSON)
              }}
            >
              Export XML
            </button>
          </div>
        </div>
        <div className="flex flex-col place-items-center justify-center">
          <Tree dataTree={treeData as ISiteMapNode} />
        </div>
      </form>
    </div>
  )
}

// <ProgressBar progress={(status as any)?.percentDone || 0} />
// isFetched && <Tree dataTree={treeData as ISiteMapNode} />}
