import React from 'react'
import ChannelundEinheitAltData from './ChannelundEinheitAltData'
import ChannelundEinheitLiveDaten from './ChannelundEinheitLiveDaten'
import ChannelundEinheitDateSuchen from './ChannelundEinheitDateSuchen'
import KomponiertGraph from './komponiertGraph'

export default function DashboardMainPage() {
  return (
<div className='min-w-screen h-screen overflow-x-hidden bg-[#F4F7FE] flex flex-col'>
  <div className='w-full flex flex-col md:flex-row pt-5'>
    <ChannelundEinheitAltData />
    <ChannelundEinheitLiveDaten />
  </div>
  <div className='w-full flex flex-row'>
    <ChannelundEinheitDateSuchen />
  </div>
  <div className='w-full flex flex-row'>
    <KomponiertGraph />
  
  </div>
</div>

  )
}
