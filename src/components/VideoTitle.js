import React from 'react'

const VideoTitle = (props) => {
  const {title,overview} = props
  return (
    <div className='pt-[20%] md:px-24 px-6 absolute w-screen aspect-video text-white bg-gradient-to-r from-black'>
      <h1 className='font-bold md:text-3xl text-xl p-2'>{title}</h1>
      <p 
        className='hidden md:block w-1/2 p-2'>{overview}</p>
      <div>
        <button 
           className='text-black bg-white p-0 md:p-2 w-20 rounded-lg hover:bg-opacity-50'>
        ▶️ Play  
        </button>
        <button 
          className='hidden md:block text-white bg-gray-400 p-2 w-30 mx-3 rounded-lg opacity-80'>
        ℹ️ More Info
        </button>
      </div>
    </div>
  )
}

export default VideoTitle