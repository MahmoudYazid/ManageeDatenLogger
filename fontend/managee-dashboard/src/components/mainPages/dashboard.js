import React from 'react'
import DashboardItems from './dashboardMenu/DashboardItems'
import DashboardMainPage from './DashboardMainPage/dashboardMainPage'

export default function dashboard() {
    return (
        <div className='min-w-screen h-screen bg-[#F4F7FE]  grid grid-rows-[1.5fr_10fr] md:grid min-[883px]:grid-cols-[1.5fr_10fr]'>
            <DashboardItems/>
            <DashboardMainPage></DashboardMainPage>
            
        </div>
    )
}
