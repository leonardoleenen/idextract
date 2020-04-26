import React from 'react'
import Link from 'next/link'

export default () => {

  return (<div className="bg-gray-200 min-h-screen px-4 py-10 flex items-center justify-center">
    <div>
      <p className="text-2xl font-bold text-gray-900 mb-4 text-center">Prueba de extracción de datos</p>
      <Link href="/scan">
        <button className="block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2">Comenzar test</button>
      </Link>  
    </div>
      </div>)
}

