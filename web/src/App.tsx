import { useState, useEffect } from 'react';

import './styles/global.css';
import { MagnifyingGlass } from 'phosphor-react';
import { api } from './services/axios';

import { Tree } from './components/Tree';
import { Loading } from './components/Loading';
import { ProgressBar } from './components/ProgressBar';

import data from './storage/data.json';
import { parseData } from './utils/parseData';
import { exportSitemap } from './utils/exportSitemap';

export function App() {
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isResultsLoaded, setIsResultsLoaded] = useState(false);
  const [loadedData, setLoadedData] = useState();
  
  const domain = 'enki.com';
  const domainData = data[domain];
  const treeData = parseData(domain, domainData);

  async function handleLoadResults() {
    setIsLoadingResults(true)
    setIsResultsLoaded(false)
    const response = await api.get(`/queue`);
    const percentDone = response.data.percentDone;
    while(percentDone < 100) {
      console.log('rLoading',response.data.percentDone)
    }
    try {
    } catch (error) {
      console.error('error loading',error)
    } finally {
      setIsLoadingResults(false)
      setIsResultsLoaded(true)
      setLoadedData(percentDone)
      console.log('rLoading',response.data.percentDone)
    }
  }

  async function handleResultsLoaded() {
    setIsResultsLoaded(true)
    try {
      const responseLoaded = await api.get('/nodes', {
        data
      })
    } catch (error) {
      console.error('error loaded',error)
    } finally {
      setIsResultsLoaded(false)
    }
  }

  return (
    <div className='overflow-hidden w-full h-full flex flex-col items-center '> 
      <h1 className='font-bold text-white text-6xl mt-40'>SiteMapper</h1>
      <h2 className='text-xs text-gray-200 mt-2'>Generate a complete sitemap of a specific domain</h2>
      <form action="" className='flex flex-col items-center'>
        <div className='w-fit flex flex-col justify-center align-middle'>
          <div className='bg-white rounded-full flex items-center gap-2 p-2 pl-4 mt-10'>
            <MagnifyingGlass />
            <input type="text" placeholder='Insert the domain' className='border-0 border-white text-gray-800'/>
          </div>
          <div className='flex flex-wrap justify-center align-middle'>
            <button
              type='button'
              className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
              disabled={isLoadingResults}
              onClick={handleLoadResults}
            >
              { !isLoadingResults ? "Generate" : <Loading  /> }
            </button>
            { 
              !isResultsLoaded ?
                <button
                    type='button'
                    className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
                    disabled={isLoadingResults}
                    onClick={exportSitemap(domain)}
                  >Export XML
                </button>
              :
                null
            }            
          </div>
        </div>
        <div className='h-full w-full flex flex-col justify-center place-items-center'>
          { 
            !isLoadingResults ?
              <ProgressBar progress={100}/>
            : null
          }        
          { 
            !isResultsLoaded ?
              <Tree tree={treeData} />  
            : null
          }
        </div>
      </form>
    </div>
  )
}