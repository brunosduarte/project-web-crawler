import { MagnifyingGlass } from 'phosphor-react';
import './styles/global.css';
import { useState } from 'react';
import { api } from './services/axios';
import { ProgressBar } from './components/ProgressBar';

export function App() {
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
      <form action="">
        <div className='bg-white rounded-full flex justify-center items-center gap-2 p-2 mt-10'>
          <MagnifyingGlass />
          <input type="text" placeholder='Insert the domain' className='border-0 text-gray-800'/>
        </div>

        <div className='mt-4 flex items-center justify-center'>
          <button
            type='button'
            className='bg-blue-500 m-2 p-2 w-36 rounded-xl hover:bg-blue-600'
            disabled={isLoadingResults}
          >
            Generate
          </button>
        </div>
      </form>

      <div className='w-full'>
        <p className='bg-green-400 flex justify-center rounded-md mt-2 ml-10 mr-10'>progress bar</p>
      </div>

      <div className='bg-purple-400 mt-6 text-white'>
        <ProgressBar progress={50} />
      </div>
    </div>
  )
}

