import React from 'react'
import Link from 'next/link'

export default () => {
  return(
    <div className='px-4 min-h-screen bg-gray-200 flex items-center justify-center md:mx-auto md:mt-16 md:rounded-lg  md:mb-0 md:h-full'>
      <div className='flex-1'>
        <header className='text-center pt-8'>
          <div className='text-2xl font-bold'>Confirma la imagen</div>
          <div className='text-base text-secondary-400'>Revisa que la imagen esté bien encuadrada y la cédula se vea correctamente</div>
        </header>
        <article className="py-8">
          <img src="/img/id.png" className="block rounded-mg w-64 ml-auto mr-auto"/>
        </article>
        <footer className='text-center md:relative md:rounded-lg'>
            <div>
              <Link href="verify_information">
                <div className='block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2'>Continuar</div>              
              </Link>
              <div className='border border-secondary-500 font-bold text-secondary-500 text-sm rounded-full py-2 px-4 py-2 mt-4 md:w-3/5 md:mx-auto'>Tomar Foto Nuevamente</div>
            </div>
        </footer>
      </div>
    </div>
  )
}

