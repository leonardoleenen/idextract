import React from 'react'

export default () => {

  const handleError = (err) => {
    // TODO: Agregar manejo de errores cuando no puede controlar la camara 
  }

  const stopCamera = async () => {
    const videoElement = document.querySelector('video#localVideo')
    videoElement['srcObject'].getTracks().forEach(track => {
      track.stop()
      //videoElement['srcObject'].removeTrack(track)
    })

  }
  
  return (<div>
    <header>
      Test de caputra
    </header>


  </div>)
}