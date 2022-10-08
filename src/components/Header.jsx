import React from 'react'
import Megaphone from './Megaphone'


function Header() {
  return (
    <header>
        <div className='flex flex-col items-center'>
            <h1 className='text-8xl font-bold'>Vox <span className='text-[#80e2bc] animate-pulse'>.</span></h1>
            <p className='text-gray-500'>Don't let anyone censor you</p>
            <div className='h-[40vh] w-full'>
              <Megaphone />
            </div>
            
        </div>
  
    </header>
  )
}

export default Header