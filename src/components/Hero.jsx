import React, { useState } from 'react'
import heroImage from "../assets/final.png";

const Hero = () => {
  return (
    <div className=' w-full mt-4 flex gap-4 h-full justify-center items-center border-b-1 border-gray-200'>
        <h1 className='max-w-md text-5xl text-center font-bold'>AI-curated recipes, music, and movies. <br /> Based on your mood</h1>
        <img className='w-1/2' src={heroImage} alt="" />
    </div>
  )
}

export default Hero