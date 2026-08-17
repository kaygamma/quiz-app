import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div
      className=' border flex flex-col gap-3 items-center justify-center h-80 w-100 hover:shadow-2xl rounded-3xl bg-linear-to-r from-cyan-500 to-blue-500 m-auto p-5 py-auto'
      >
        <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-4xl object-center' 
        
        >
          Start
        </button>{' '}
        
        </div>
    </>
  )
}

export default App
