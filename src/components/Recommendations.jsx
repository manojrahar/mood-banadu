import React from 'react'

const Recommendations = () => {
  return (
    <div>
        <div className='flex gap-8'>
            <div className='bg-white h-65 w-90 rounded-4xl flex p-3 relative border-zinc-100 border shadow-gray-500 shadow-xl/30'>
                <img className='max-w-45 min-w-40 rounded-3xl' src="https://i.pinimg.com/originals/ea/77/43/ea77431d8420854305055b0511ce6266.jpg" alt="" />
                <p className='bg-indigo-500 shadow-indigo-500 shadow-xl/30 text-white px-2.5 py-0.5 rounded-2xl absolute right-4 text-sm'>AI Recommended</p>
                <p className='text-center relative top-14 p-4 text-lg font-bold text-gray-500'>Discover new recipes tailored to your mood.</p>
                <p className='bg-teal-200  text-teal-700 px-3 py-0.5 rounded-2xl absolute bottom-3 right-9 text-lg font-bold'>Cook This</p>
            </div>

            <div className='bg-white h-65 w-90 rounded-4xl flex p-3 relative border-zinc-100 border shadow-gray-500 shadow-xl/30'>
                <img className='max-w-45 min-w-40 rounded-3xl' src="https://m.media-amazon.com/images/I/61ygTdD3mDL.jpg" alt="" />
                <p className='bg-indigo-500 shadow-indigo-500 shadow-xl/30 text-white px-2.5 py-0.5 rounded-2xl absolute right-4 text-sm'>AI Recommended</p>
                <p className='text-center relative top-9.5 p-6 text-lg font-semibold text-gray-500'>Listen while you cook and make cooking fun.</p>
                <p className='bg-purple-200  text-purple-700 px-3 py-0.5 rounded-2xl absolute bottom-3 right-9 text-lg font-bold'>Play Music</p>
            </div>
            <div className='bg-white h-65 w-90 rounded-4xl flex p-3 relative border-zinc-100 border shadow-gray-500 shadow-xl/30'>
                <img className='max-w-45 min-w-40 rounded-3xl' src="https://i.pinimg.com/originals/67/c0/63/67c06374f834373de99ee78c5625938f.jpg" alt="" />
                <p className='bg-indigo-500 shadow-indigo-500 shadow-xl/30 text-white px-2.5 py-0.5 rounded-2xl absolute right-4 text-sm'>AI Recommended</p>
                <p className='text-center relative top-12 p-4 text-lg font-bold text-gray-500'>Watch while you eat. Movie that matches your vibe.</p>
                <p className='bg-orange-200  text-orange-700 px-3 py-0.5 rounded-2xl absolute bottom-3 right-7 text-lg font-bold'>Watch Movie</p>
            </div>
        </div>
    </div>
  )
}

export default Recommendations