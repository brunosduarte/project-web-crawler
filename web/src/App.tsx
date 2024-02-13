import { MagnifyingGlass } from 'phosphor-react';
import './styles/global.css';
import { useState } from 'react';
import { api } from './services/axios';
import { ProgressBar } from './components/ProgressBar';
import { Tree, MockDataTree }  from './components/Tree';
import * as d3 from "d3";
import { Loading } from './components/Loading';
import { tree } from './utils/processData';

export function App() {
  console.log(tree);

  const [isLoadingResults, setIsLoadingResults] = useState(false)
  
  async function handleGenerateSitemap() {
    setIsLoadingResults(true)
    try {
      const response = await api.get('/sitemap', {
        params: {
          domain: 'https://www.google.com'
        }
      })
      console.log(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingResults(false)
    }
  }
  
  return (
    <div className='bg-black w-screen h-screen flex flex-col items-center '>
      <h1 className='font-bold text-white text-6xl mt-40'>SiteMapper</h1>
      <h2 className='text-xs text-gray-200 mt-2'>Generate a complete sitemap of a specific domain</h2>
      <form action="" className='flex flex-col items-center'>
        <div className='bg-white rounded-full flex w-full items-center gap-2 p-2 pl-4 mt-10'>
          <MagnifyingGlass />
          <input type="text" placeholder='Insert the domain' className='border-0 text-gray-800'/>
        </div>

        <button
          type='button'
          className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
          disabled={isLoadingResults}
        >
          { !isLoadingResults ? "Generate" : <Loading  /> }
        </button>

        { 
          !isLoadingResults ?
            <ProgressBar progress={21}/>
          :
            null
        }
        
        { 
        !isLoadingResults ?
          <Tree data={MockDataTree} /> 
        : 
          <button
            type='button'
            className='bg-blue-500 flex justify-center place-items-center m-4 p-2 w-36 rounded-xl hover:bg-blue-600 disabled:bg-blue-800'
            disabled={!isLoadingResults}
          >
            { !isLoadingResults ? "Export XML" : <Loading /> }
          </button>
        }
      </form>
    </div>
  )
}