import React from 'react'

import Item from './item';
import { MdOutlineContactSupport } from "react-icons/md";

import { TbSunElectricity } from "react-icons/tb";


import LogoManageE from '../../../img/logo.png'

export default function DashboardItems() {
  return (
        <div className='bg-[#F4F7FE] md:w-full w-full h-[10em] md:h-full  flex flex-col items-center justify-spaces' >

        <img src={LogoManageE} className='w-[9em] h-[3em] animate-pulse mt-5 '></img>
        <div className='w-full flex flex-row flex-wrap block md:hidden justify-center items-center '>
        <Item DrawComponent={TbSunElectricity} name={"dashboard"}/>

        

        </div>

        <div className='w-full h-full md:flex md:flex-col hidden md:block items-center justify-start gap-3  '>
        <Item DrawComponent={TbSunElectricity} name={"dashboard"}/>
     


        </div>

        </div>
  )
}
