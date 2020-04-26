import React from 'react'
import Link from 'next/link'

export default () => {
  return(
    <div className='px-4 min-h-screen bg-gray-200 flex items-center justify-center md:mx-auto md:mt-16 md:rounded-lg  md:mb-0 md:h-full'>
      <div className='flex-1'>
        <header className='text-center p-4 pt-8'>
          <div className='text-2xl font-bold mb-4'>Muchas gracias</div>
          <Link href="/">
            <div className='block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2'>Volver al inicio</div>
          </Link>
        </header>
      </div>
    </div>
  )
}