import React from 'react'
import DashboardItems from './dashboard/DashboardItems'
export default function dashboard() {
    return (
        <div className='w-screen h-screen bg-green-200 grid grid-rows-[1.5fr_10fr] md:grid md:grid-cols-[1.5fr_10fr]'>
            <DashboardItems/>
            <div className='w-full h-screen bg-black grid grid-cols-[1fr_7fr]'>

               


            </div>
            
        </div>
    )
}
