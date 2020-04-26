import React from 'react'
import Link from 'next/link'

export default () => {
  return(
    <div className='px-4 min-h-screen bg-gray-200 md:mx-auto md:mt-16 md:rounded-lg  md:mb-0 md:h-full'>
      <div className='flex-1'>
        <header className='text-center p-4 pt-10'>
          <div className='text-2xl font-bold'>Verifica la información</div>
        </header>
        <article className="py-6 px-5 rounded-lg bg-white mb-4">
          <div className="mb-4">
            <p className="text-base text-gray-600 mb-1">Nombre</p>
            <p className="text-base text-gray-900 font-bold">Suhail Eylienn Suira Moncada Luna</p>
          </div>
          <div className="mb-4">
            <p className="text-base text-gray-600 mb-1">Cédula</p>
            <p className="text-base text-gray-900 font-bold">4-746-409</p>
          </div>  
          <div className="mb-4">
            <p className="text-base text-gray-600 mb-1">Fecha de nacimiento</p>
            <p className="text-base text-gray-900 font-bold">15-DIC-1997</p>
          </div>  
          <div>
            <p className="text-base text-gray-600 mb-1">Sexo</p>
            <p className="text-base text-gray-900 font-bold">F</p>
          </div>                              
        </article>
        <footer className='p-4 text-center md:relative md:rounded-lg'>
            <div>
              <Link href="thank_you">
                <div className='block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2'>Los datos son correctos</div>
              </Link>
              <Link href="thank_you">
                <div className='border border-secondary-500 font-bold text-secondary-500 text-sm rounded-full py-2 px-4 py-2 mt-4 md:w-3/5 md:mx-auto'>Los datos son incorrectos</div>
              </Link>
            </div>
        </footer>
      </div>
    </div>
  )
}

