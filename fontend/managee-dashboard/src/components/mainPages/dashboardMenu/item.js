import React from 'react'

export default function Item({name , DrawComponent} ) {
  return (
    <div className='md:pl-10 cursor-pointer mt-3 flex flex-row md:w-[15rem] w-fit h-[3em] bg-transparent items-center border-r-2 border-r-[#F4F7FE] hover:border-white-300 hover:shadow-md hover:bg-white hover:rounded-lg'>
      <div className='rounded-lg bg-[#4FD1C5] flex items-center justify-center w-[2.5em] h-[2.5em] mr-3'>
        <DrawComponent size={30} className='text-white' />
      </div>
      <p className='hidden md:block whitespace-nowrap'>{name}</p>
    </div>
  )
}
