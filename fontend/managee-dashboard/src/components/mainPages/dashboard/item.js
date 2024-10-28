import React from 'react'

export default function Item({name , DrawComponent} ) {
  return (
    <div className='cursor-pointer flex flex-row md:w-full w-fit h-[3em] bg-transparent  justify-center items-center border-r-2 border-r-[#F6F6FB] hover:border-r-blue-500 hover:bg-[#EDEDF5] '>
        <DrawComponent  size={40} className='text-black '/>
        <p className='hidden md:block'>{name}</p>
      </div>
  )
}
