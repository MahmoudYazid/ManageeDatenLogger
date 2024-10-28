import React, { useEffect } from 'react'
import LogoManageE from '../../img/logo.png'
import { useNavigate } from 'react-router-dom';


export const IntroPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/Dashboard'); 
    }, 4000)}); 
  return (
    <div className='w-screen h-screen bg-white flex  justify-center items-center	'>
      
        <img src={LogoManageE} className='w-[9em] h-[4em] animate-pulse  '></img>

    </div>
  )
}
