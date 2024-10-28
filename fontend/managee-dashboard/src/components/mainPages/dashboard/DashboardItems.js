import React from 'react'
import { TbSolarElectricity } from "react-icons/tb";
import Item from './item';
import { TbSunElectricity } from "react-icons/tb";
import LogoManageE from '../../../img/logo.png'

export default function DashboardItems() {
  return (
        <div className='bg-white md:w-[18rem] w-full h-[10em] md:h-screen  flex flex-col items-center justify-center' >

        <img src={LogoManageE} className='w-[9em] h-[3em] animate-pulse mt-5 '></img>
        <div className='w-full flex flex-row flex-wrap block md:hidden justify-center items-center p-3'>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>

        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>
        </div>

        <div className='w-full flex flex-col  hidden md:block p-3'>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>
        <Item DrawComponent={TbSolarElectricity} name={"hhhhh"}/>

        </div>

        </div>
  )
}
