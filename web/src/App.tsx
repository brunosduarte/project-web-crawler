import { useCallback, useEffect, useState } from 'react';
import { useResults, useStatus } from './hooks';
import { useMutation } from 'react-query';

import '@/styles/global.css';
import { MagnifyingGlass } from 'phosphor-react';

import dataJSON from '@/storage/tree.json';
import { Tree } from '@/components/Tree';
import { parseData } from '@/utils/parseData';

import { Loading } from '@/components/Loading';
import { ProgressBar } from '@/components/ProgressBar';
import { generateSitemapXml, downloadSitemap, extractUrls  } from '@/utils/generateSitemap';
import { crawlURL } from './services/api';
import { getTree } from '@/services/api';

export function App() {
  const { data: results, isError, isFetching, isFetched } = useResults();
  const { data: status } = useStatus()
  const { mutateAsync: addToScrap } = useMutation({
    mutationFn: getTree,
  });
  const [searchDomain, setSearchDomain] = useState('');
  const [isErrorTyping, setErrorTyping] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState('');
  
  const treeData = parseData(dataJSON);

  const regexDomain = '/(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/'
  // ^((http|https)://)?([a-z0-9]+(-[a-z0-9]+)*\\.)+[a-z]{2,}$';
  const exportSitemap = useCallback(() => {
    try {
      const urls = extractUrls(dataJSON as any);
      const xmlContent = generateSitemapXml(urls);
      downloadSitemap(xmlContent, 'domain');
    } catch (e: any) {
      setErrorMessage(e.message);
    }
  }, []);

  return (
    <div className='overflow-y-auto w-full h-screen flex flex-col items-center '> 
      <h1 className='font-bold text-white text-6xl mt-40'>SiteMapper</h1>
      <h2 className='text-xs text-gray-200 mt-2'>Generate a complete sitemap of a specific domain</h2>
      <form action="" className='flex flex-col items-center'>
        <div className='w-fit flex flex-col justify-center align-middle'>
          <label htmlFor="insert-domain" className='flex flex-row justify-center place-items-center'>
            <div className='bg-white rounded-full flex items-center gap-2 p-2 pl-4 mt-10'>
              <MagnifyingGlass />           
              <input 
                type="text"
                id="insert-domain"
                placeholder="enki.com"
                className="border-0 border-transparent text-gray-800"
                value={searchDomain}
                pattern={regexDomain} // Convert regexDomain to string
                onChange={event => setSearchDomain(event.target.value)}
              />
            </div>
          </label>
          
          <div className='text-xs text-gray-400 mt-1 flex justify-center'>
            { 
              isErrorTyping ?
                <p className='text-red-300'>{isErrorTyping}</p>
              :
                isErrorMessage ?
                  <p className='text-red-300'>{isErrorMessage}</p>
                :
                  searchDomain.length === 0 ?
                    'Insert the domain to crawl'
                  :
                  <p className='text-transparent'>{`.`}</p>
            }
          </div>
    
          <div className='flex flex-wrap justify-center align-middle'>
            <button
              type='button'
              className='bg-blue-500 text-slate-300 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
              onClick={async () => {
                try {
                  if (searchDomain) {
                    console.log(results)
                    await crawlURL(searchDomain)
                    setSearchDomain(searchDomain)
                  }
                  setErrorMessage("Insert the domain to crawl")
                } catch (e: any) {
                  isError
                  console.error(e)
                  setErrorTyping(e.message)
                  setErrorMessage(e.message)
                }
              }} 
            >
              { !isFetching ? "Generate" : <Loading  /> }
            </button>
            { isFetched &&
                <button
                  type='button'
                  className='bg-blue-500 text-slate-300 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
                  onClick={exportSitemap}
                >
                  Export XML
                </button>
            }    
          </div>
        </div>
        <div className='flex flex-col justify-center place-items-center'>
          { 
            isFetching ?
              <ProgressBar progress={(status as any)?.percentDone || 0} />       
            :
            isFetched &&
              <Tree dataTree={treeData as any} />  
          }    
        </div>
      </form>
    </div>
  )
}
