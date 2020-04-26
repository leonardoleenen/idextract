// /* eslint-disable jsx-a11y/media-has-caption */
// /* eslint-disable no-undef */
// import React, { useState, useEffect } from 'react'
// // import Webcam from 'react-webcam'
// // import { useSelector, useDispatch } from 'react-redux'
// // import * as facemesh from '@tensorflow-models/facemesh'
// import { useRouter } from 'next/router'


// import Link from 'next/link'

// // import Page from '../../components/page'
// // import { setProfile, updateSignIn } from '../../redux/store'
// // import Loading from '../../components/loading'


// export default () => {
//   const profile: TravelerProfile = useSelector((state) => state.signup.profile)
//   const dispatch = useDispatch()
//   const [passportPhoto, setPassportPhoto] = useState(null)
//   const [frontCamera, setFrontCamera] = useState(false)
//   const [selfie, setSelfie] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const [webcamSize, setWebcamSize] = useState(null)
//   const [dataValidated, setDataValidated] = useState(false)
  

//   useEffect(() => {
//     if (!profile) { router.push('/signup') }
//     setWebcamSize({
//       vw: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
//       vh: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
//     })
//   }, [])

//   const videoConstraints = {
//     width: webcamSize ? webcamSize.vh : 380,
//     height: webcamSize ? webcamSize.vw : 380,
//     facingMode: 'user',
//   }

  


 

//   const Camera = () => {
//     const webcamRef = React.useRef(null)

//     const capture = React.useCallback(
//       async () => {
//         const imageSrc = webcamRef.current.getScreenshot()
//         if (!selfie) {
//           profile.imageProfile = imageSrc
//           dispatch(setProfile({ ...profile }))
//           setSelfie(imageSrc)
//           if (window['stream']) {
//             window['stream'].getTracks().forEach(function(track) {
//               track.stop();
//             })
//           }
//           router.push('/signup/photo_id')
//         }
//       },
//       [webcamRef],
//     )

//     return (
//       <div className="min-h-full bg-bgScreen-500 md:mx-auto md:mt-16 md:rounded-lg  md:mb-0 md:h-full">
//         <header className="flex justify-center mb-4 absolute left-0 right-0">
//           <div className="mt-6 px-4 py-2 bg-gray-700 text-white rounded-full ">{'Toma el frente de tu cédula'}</div>
//         </header>
//         <article>
//           <div className="md:mx-auto ">
//             <Webcam
//               audio={false}
//               ref={webcamRef}
//               screenshotFormat="image/jpeg"
//               videoConstraints={videoConstraints}
//               className="max-w-none w-full mx-auto md:w-3/5 md:mx-auto "
//             />
//           </div>
//         </article>
//         <footer className="fixed inset-x-0 bottom-0 shadow-md  pt-8 flex justify-center items-center md:relative ">
//           <div className="bg-gray-100 pb-6 pt-4 px-4 br-radius flex justify-center items-center w-full opacity-75 ">

//             <Link href="/signup">
//               <div className="w-1/3 flex justify-center"><IconClose /></div>
//             </Link>
//             <div className="w-1/3 flex justify-center" onClick={capture}>
//               <div className="bg-primary-500 h-16 w-16 rounded-full flex text-center items-center justify-center">
//                 <span className="text-white font-bold text-2xl" />
//               </div>
//             </div>
//             <div className="w-1/3 flex justify-center" onClick={() => setFrontCamera(!frontCamera)}><IconCamera /></div>
//           </div>
//         </footer>
//         <style>
//           {`
//               .br-radius{
//                 border-radius:20px 20px 0px 0px;
//               }
//           @media (min-width: 768px){
//             html{
//               background:#E5E5E5;
//             }
//           .bg-gray-200{
//           width:768px;
          
//           }
//           footer{
//             width:768px;
            
          
//           }
//           }
//         `}
//         </style>


//       </div>
//     )
//   }


//   if (!selfie) return <Camera />

//   return <Loading />


  
// }

// const IconClose = () => (
//   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M0.229826 16.6677C-0.0708 16.9683 -0.0823625 17.4654 0.229826 17.7659C0.542014 18.078 1.0392 18.078 1.33983 17.7659L9.00578 10.1134L16.6602 17.7659C16.9608 18.078 17.4695 18.078 17.7702 17.7659C18.0708 17.4654 18.0708 16.9683 17.7702 16.6677L10.1042 9.00362L17.7702 1.33951C18.0708 1.03895 18.0824 0.530324 17.7702 0.229771C17.458 -0.070783 16.9608 -0.070783 16.6602 0.229771L9.00578 7.89389L1.33983 0.229771C1.0392 -0.070783 0.530451 -0.0823428 0.229826 0.229771C-0.0708 0.541884 -0.0708 1.03895 0.229826 1.33951L7.89578 9.00362L0.229826 16.6677Z" fill="#718096" />
//   </svg>
// )

// const IconShot = () => (
//   <svg width="66" height="66" viewBox="0 0 66 66" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <circle cx="33" cy="33" r="30.5" stroke="#63B3ED" strokeWidth="5" />
//     <circle cx="33" cy="33" r="25" fill="#63B3ED" />
//   </svg>
// )

// const IconCamera = () => (
//   <svg width="34" height="27" viewBox="0 0 34 27" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M4.28776 27H29.68C32.5143 27 33.9677 25.5592 33.9677 22.793V7.66489C33.9677 4.88421 32.5143 3.44344 29.68 3.44344H25.9882C24.8254 3.44344 24.4911 3.28495 23.7934 2.50694L22.587 1.16702C21.8312 0.360192 21.1626 0 19.7091 0H14.0406C12.5871 0 11.9185 0.360192 11.1627 1.16702L9.95631 2.50694C9.27318 3.27054 8.92435 3.44344 7.76156 3.44344H4.28776C1.45348 3.44344 0 4.88421 0 7.66489V22.793C0 25.5592 1.45348 27 4.28776 27ZM4.31683 25.2135C2.718 25.2135 1.80231 24.3634 1.80231 22.6921V7.75133C1.80231 6.09445 2.718 5.22999 4.31683 5.22999H8.13947C9.46213 5.22999 10.1162 5.04269 10.872 4.20704L12.0639 2.88154C12.8923 1.97385 13.3138 1.78655 14.5202 1.78655H19.2295C20.4359 1.78655 20.8574 1.97385 21.6859 2.88154L22.8777 4.20704C23.619 5.04269 24.2876 5.22999 25.6103 5.22999H29.6364C31.2497 5.22999 32.1654 6.09445 32.1654 7.75133V22.6921C32.1654 24.3634 31.2497 25.2135 29.6364 25.2135H4.31683ZM16.9911 6.78602C15.1743 6.78602 13.3284 7.47759 12.0639 8.6158C11.5261 9.04803 11.4098 9.60993 11.8022 10.0133C12.1947 10.4023 12.6743 10.3447 13.1104 9.99893C14.3313 8.96158 15.5377 8.50053 16.9911 8.50053C20.0144 8.50053 22.4853 10.5752 23.0521 13.3271H21.4097C20.8865 13.3271 20.7411 13.817 21.0463 14.2204L23.183 17.2604C23.5318 17.7647 24.0986 17.7935 24.462 17.2604L26.5695 14.2204C26.8602 13.7882 26.7585 13.3271 26.2207 13.3271H24.6946C24.055 9.45144 20.9446 6.78602 16.9911 6.78602ZM7.71796 15.6035H9.30225C9.94178 19.4792 13.0668 22.1446 17.0057 22.1446C18.8225 22.1446 20.6539 21.453 21.9475 20.3148C22.4707 19.8826 22.587 19.3207 22.1946 18.9173C21.8167 18.5283 21.3225 18.5859 20.8719 18.9317C19.651 19.9546 18.4592 20.4301 17.0057 20.4301C13.9824 20.4301 11.5115 18.3554 10.9447 15.6035H12.529C13.0668 15.6035 13.1976 15.1137 12.9069 14.7102L10.7703 11.6702C10.4069 11.166 9.84004 11.1371 9.47667 11.6702L7.36913 14.7102C7.07843 15.1425 7.18017 15.6035 7.71796 15.6035Z" fill="#718096" />
//   </svg>
// )

// const IconBack = () => (
//   <svg width="12" height="21" viewBox="0 0 12 21" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path fillRule="evenodd" clipRule="evenodd" d="M9.53714 20.0827L0.292152 10.9458C-0.097384 10.5612 -0.097384 9.93981 0.292152 9.5542L9.53714 0.417333C10.0995 -0.139111 11.0144 -0.139111 11.5777 0.417333C12.14 0.973776 12.14 1.87687 11.5777 2.43332L3.66913 10.2505L11.5777 18.0657C12.14 18.6231 12.14 19.5262 11.5777 20.0827C11.0144 20.6391 10.0995 20.6391 9.53714 20.0827Z" fill="#1A202C" />
//   </svg>
// )

// const IconBackWhite = () => (
//   <svg width="10" height="19" viewBox="0 0 10 19" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M8.40491 18.7047C8.57873 18.8906 8.80368 19 9.06953 19C9.60123 19 10 18.5734 10 18.0046C10 17.7311 9.89775 17.4796 9.73415 17.2936L2.29039 9.50547L9.73415 1.71733C9.89775 1.53138 10 1.26885 10 1.00633C10 0.437536 9.60123 0 9.06953 0C8.80368 0 8.57873 0.109384 8.40491 0.295337L0.306748 8.7726C0.112474 8.94761 0 9.22107 0 9.50547C0 9.77893 0.102249 10.0305 0.296524 10.2383L8.40491 18.7047Z" fill="#F7FAFC"/>
//   </svg>
// )
