import { useState } from 'react';

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
  const [searchDomain, setSearchDomain] = useState('');
  const [isLoadingResults, setIsLoadingResults] = useState(false);
  const [isResultsLoaded, setIsResultsLoaded] = useState(false);
  const [isErrorTyping, setErrorTyping] = useState(false);
  const [isErrorMessage, setErrorMessage] = useState();
  const [loadedData, setLoadedData] = useState();
  
  const domain = 'enki.com';
  const domainData = data[domain];
  const treeData = parseData(domain, domainData);

  async function handleLoadResults() {
    setIsLoadingResults(true)
    setIsResultsLoaded(false)
    const response = await api.get(`/queue`);
    const percentDone = response.data.percentDone;
    console.log('percentDone',percentDone)



    try {
      const dataLoaded = await api.get('/node', {
        data
      })

      setLoadedData(dataLoaded)
      
    } catch (error) {
      console.error('error loading',error)
    } finally {
      setIsLoadingResults(false)
      setIsResultsLoaded(true)
      setLoadedData(percentDone)
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
              disabled={isLoadingResults}
              onClick={handleLoadResults}
            >
              { !isLoadingResults ? "Generate" : <Loading  /> }
            </button>
            { 
              isResultsLoaded ?
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
            isLoadingResults ?
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