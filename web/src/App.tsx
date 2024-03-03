import { useState } from 'react';

import '@/styles/global.css';
import { MagnifyingGlass } from 'phosphor-react';
import { useResults, useStatus } from './hooks';

import { Tree } from '@/components/Tree';
//import dataTree from '@/storage/tree.json';

import { Loading } from '@/components/Loading';
import { ProgressBar } from '@/components/ProgressBar';


import data from '@/storage/tree.json';
import { parsedData } from '@/utils/parsedData';
import { exportSitemap } from '@/utils/exportSitemap';
import { useMutation } from 'react-query';
import { getTree, searchCrawlDomain } from '@/services/api';

export function App() {
  const { data: results, isError, isLoading } = useResults();
  const { data: status } = useStatus()
  const { mutateAsync: addToScrap } = useMutation({
    mutationFn: getTree,
  });
  const [searchDomain, setSearchDomain] = useState('');
  const [isErrorTyping, setErrorTyping] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState();
  const [loadedData, setLoadedData] = useState();
  
  const domain = 'enki.com';
  //const domainData = data[domain];
  const treeData = parsedData(data);


  return (
    <div className='overflow-y-auto w-full h-full flex flex-col items-center '> 
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
                placeholder="Insert the domain to crawl"
                className="border-none border-transparent text-gray-800"
                value={searchDomain}
                onChange={event => setSearchDomain(event.target.value)}
              />
            </div>
          </label>
    
          <div className='flex flex-wrap justify-center align-middle'>
            <button
              type='button'
              className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
              onClick={ async () => {
                try {
                  await searchCrawlDomain(searchDomain)
                  setSearchDomain(searchDomain)
                } catch (e) {
                  console.error(e)
                }
              }} 
            >
              { !isLoading ? "Generate" : <Loading  /> }
            </button>
            { 
              data ?
                <button
                    type='button'
                    className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
                    onClick={exportSitemap(domain)}
                  >Export XML
                </button>
              :
                null
            }            
            
          </div>
        </div>
        <div className='h-full w-full flex flex-col justify-center place-items-center'>
          <Tree dataTree={treeData as any} />  
          { 
            isLoading ?
            'h'
            :
            <ProgressBar progress={status?.percentDone || 0} />       
          }    
        </div>
      </form>
    </div>
  )
}