import React from 'react'

function Spinner() {
  return (
    <div className='flex justify-center items-center py-3'>
      <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-[#e1d2d2]'></div>
    </div>
  )
}

export default Spinner