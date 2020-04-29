import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Tesseract from 'tesseract.js'

export default () => {

  const [isFrontCamera, setIsFrontCamera] = useState(false)
  const [cameraList, setCameraList] = useState([])
  const [photoId,setPhotoId] = useState(null)
  const [heightViewPort, setHeightViewPort] = useState(0)
  const [widthViewPort, setWidthViewPort] = useState(0)
  const [topVideo, setTopVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [dataRetrieved, setDataRetrieved] = useState(null)
  const [isFetchingData,setIsFetchingData] =useState(false)
  const [id,setId] = useState(null)
  const [completeName, setCompleteName] = useState(null)

  useEffect(() => {
    const initCameras = async () => {
      

      var DEVICES = [];
      var final = null;
      navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {

          var arrayLength = devices.length;
          for (var i = 0; i < arrayLength; i++) {
            var tempDevice = devices[i];
            //FOR EACH DEVICE, PUSH TO DEVICES LIST THOSE OF KIND VIDEOINPUT (cameras)
            //AND IF THE CAMERA HAS THE RIGHT FACEMODE ASSING IT TO "final"
            if (tempDevice.kind == "videoinput") {
              DEVICES.push(tempDevice);
              if (tempDevice['facingMode'] == "environment" || tempDevice.label.indexOf("facing back") >= 0) { final = tempDevice; }
            }
          }

          setCameraList(DEVICES)
          var totalCameras = DEVICES.length;
          //If couldnt find a suitable camera, pick the last one... you can change to what works for you
          if (final == null) {
            //console.log("no suitable camera, getting the last one");
            final = DEVICES[totalCameras - 1];
          };

          //Set the constraints and call getUserMedia
         

        })
        .catch(function (err) {
          console.log(err.name + ": " + err.message);
        });
    }

    initCameras()
    const videoElement = document.querySelector('video#localVideo') as HTMLVideoElement
    videoElement.addEventListener('play', () => {
      console.log('Comenzo reproduccion')
      setHeightViewPort((document.querySelector('video#localVideo') as HTMLDivElement).offsetHeight)
      setWidthViewPort((document.querySelector('video#localVideo') as HTMLDivElement).offsetWidth)
      setTopVideo((document.querySelector('video#localVideo') as HTMLDivElement).offsetTop)
    })

  }, [])

  function handleSuccess(stream) {
    const videoElement = document.querySelector('video#localVideo');
    videoElement['srcObject'] = stream;
  }

  function handleError(error) {
    console.log('navigator.getUserMedia error: ', error);
  }
  
  const selectCamera = (camID) => { 

    // setIsFrontCamera(!isFrontCamera)
    const videoElement = document.querySelector('video#localVideo') as HTMLVideoElement
    if(videoElement['srcObject']) {
      stopCamera()
    }

    
    var constraints = {
      audio: false,
      video: {
        facingMode: {exact:'environment'}
      }
    };

    navigator.mediaDevices.getUserMedia(constraints).
      then(handleSuccess).catch(handleError);

    videoElement.addEventListener('play', () => {
      setIsPlaying(true)
    })
  }

  const capture = async () => {
   
    const videoElement = document.querySelector('video#localVideo');
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
   
    const sTop = (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetTop / 2
    const sLeft = (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetTop / 5

    canvas.width = (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetWidth + (sTop / 5)
    canvas.height = (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetHeight + (sTop / 5)
    
      canvas
        .getContext('2d')
        .drawImage(
          videoElement as HTMLVideoElement,
          sLeft, 
          sTop -40, 
          (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetWidth + (sTop / 5),
          (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetHeight + (sTop / 5),
          0,
          0,
          (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetWidth + (sTop / 5),
          (document.getElementsByClassName("frameGuide")[0] as HTMLDivElement).offsetHeight  + (sTop / 5));
    setPhotoId(canvas.toDataURL('image/png'));
  };

  const stopCamera = async () => {
    const videoElement = document.querySelector('video#localVideo')
    videoElement['srcObject'].getTracks().forEach(track => track.stop())
  }

  const fetchData = async  ()=> {
    setIsFetchingData(true)
    const result = await axios.post('https://openhealth.symfony.com.ar/api/extractinfo_ocr_panama',{
      base64_image:photoId
    })

    setDataRetrieved(result.data)
    setIsFetchingData(false)

  }

  const SecondStep = () => (
    <div className="text-center">
      <header>
        <div className="p-4 text-2xl font-bold">Verifique la imagen</div>
        <div className="px-4">Por favor, verifique que la imagen cropeada sea correcta y tenga buena calidad </div>
      </header>
      <article className="pt-4">
        <img src={photoId}></img>
      </article>
      <footer className="p-4 pt-8">
        <button onClick={() => setPhotoId(null)} className="block w-full text-indigo-500  text-center text-sm font-bold rounded-full px-5 py-2">Volver a tomar foto</button>
        <button onClick={() => fetchData()} className="mt-4 block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2">Continuar</button>
      </footer>
    </div>
  )

  const LastStep = () => {
    


    const { createWorker } = Tesseract;
    (async () => {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data} = await worker.recognize("data:image/png;base64,"+ dataRetrieved.ID_image);
      setId(data)
      console.log(data)
    })();  

    (async () => {
      const worker = createWorker();
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data } = await worker.recognize("data:image/png;base64,"+ dataRetrieved.Name_image);
      setCompleteName(data);
    })();

    return (<div>
      <header className="text-center">
        <div className="p-8">Resultados del proceso</div>
      </header>
      <img src={"data:image/png;base64,"+dataRetrieved.faceID}></img>
      <img src={"data:image/png;base64,"+ dataRetrieved.ID_image}></img>
      <img src={"data:image/png;base64,"+dataRetrieved.Name_image}></img>
      <div className="p-4">
        <div className="py-4">Extracción de texto</div>
        <div className="flex justify-between">
          <div className="font-bold">{id ? id['text'] : 'Fetching...'}</div>
          <div>{id ? id['confidence'] : 'Fetching...'}</div>
        </div>
        <div className="flex justify-between">
          <div className="font-bold">{completeName ? completeName['text'] : 'Fetching...'}</div>
          <div>{completeName ? completeName['confidence'] : 'Fetching...'}</div>
        </div>

        <div className="p-4">
          <button
            className="block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2"
            onClick={() => {
              setDataRetrieved(null)
              setPhotoId(null)
              setIsFetchingData(false)
            }}>Probar otra foto </button>
        </div>
        
      </div>
    </div>)
  }

  if (photoId && !isFetchingData && !dataRetrieved) return <SecondStep /> 

  if (dataRetrieved) return <LastStep /> 
 
  if (isFetchingData) return <div>Cargando...</div>

  return (<div className="bg-gray-200 min-h-screen text-center">

    <div>
      <div className="p-4">
        <p className="text-xl font-bold text-primary-600 pt-8 px-4">Test de extracción de información</p>
        <p className="text-base text-gray-600 mb-4">Pulsa el botón para activar la camara <br/> Luego toma una fotografía del frente de la cédula.</p>
      </div>
      <button className="py-1 px-4 bg-primary-500 text-blue-800 text-sm font-bold rounded-full mb-6" onClick={()=>selectCamera(null)}>Activar Camara</button>
      <div className='md:mx-auto flex items-center justify-center'>
        <div
            style={{

              top: topVideo + ((heightViewPort - topVideo) / 2),
              width: widthViewPort / 1.2,
              height: heightViewPort / 2.6,
            }}
            onClick={capture}
            className={`${'rounded-lg '} frameGuide border border-gray-200 border-2 absolute z-50 items-center flex`}
          ></div>
      </div>
      <video id="localVideo" autoPlay playsInline controls={false} />
      {isPlaying ? (
        <div className="p-4">
          <button
            className="block w-full bg-indigo-500 text-gray-100 text-center text-sm font-bold rounded-full px-5 py-2"
            onClick={capture}>Tomar Fotografía  </button>
        </div>
      ) : ''}
    </div>

    
    
  </div>)
}