import { useState } from 'react';

import './styles/global.css';
import { MagnifyingGlass } from 'phosphor-react';

import { api } from './services/axios';
import { Loading } from './components/Loading';
import { ProgressBar } from './components/ProgressBar';

import data from './storage/data.json';
import { parsedData } from './utils/parsedData';
import { Tree } from './components/Tree';

export function App() {
  const domainData = data['enki.com']; // Replace 'data' with your actual variable holding the JSON data
  const treeData = parsedData('enkiexample.com', domainData);
  
  const [isLoadingResults, setIsLoadingResults] = useState(false)
  
  async function handleGenerateSitemap() {
    setIsLoadingResults(true)
    try {
      const response = await api.get('/sitemap', {
        params: {
          domain: domainData
        }
      })
      console.log('response',response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingResults(false)
    }
  }
  return (
    <div className='bg-gray-800 w-screen h-screen flex flex-col items-center '> 
    <div className='bg-green-200'><Tree data={treeData} /></div>
      <h1 className='font-bold text-white text-6xl mt-40'>SiteMapper</h1>
      <h2 className='text-xs text-gray-200 mt-2'>Generate a complete sitemap of a specific domain</h2>
      <form action="" className='flex flex-col items-center'>
        <div className='bg-white rounded-full flex items-center gap-2 p-2 pl-4 mt-10'>
          <MagnifyingGlass />
          <input type="text" placeholder='Insert the domain' className='border-0 border-white text-gray-800'>
            
          </input>
        </div>
        <div className='flex flex-wrap justify-center align-middle'>
        <button
          type='button'
          className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
          disabled={isLoadingResults}
        >
          { isLoadingResults ? "Generate" : <Loading  /> }
        </button>
        <button
            type='button'
            className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
            disabled={!isLoadingResults}
          >
            { !isLoadingResults ? "Export XML" : <Loading /> }
          </button>
        </div>
        { 
          !isLoadingResults ?
            <ProgressBar progress={21}/>
          :
            null
        }        
        { 
        isLoadingResults ?
          `Tree`
        :   
         `treeOn` 
        }
      </form>
      
    </div>
  )
}