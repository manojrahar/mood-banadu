import { MdDoubleArrow } from "react-icons/md";

const HowItWorks = () => {
  return (
   <div id="how-it-works" className='border-t border-gray-200 w-full p-8'>
        <h2 className='text-center font-bold text-4xl'>How It Works</h2>
        <div className='flex items-center justify-center'>
            <div className='border-zinc-100 border shadow-gray-500 shadow-xl/30 text-lg bg-white w-80 rounded-3xl p-4 m-5'>
                <h3 className='font-bold text-xl text-gray-800 border-b border-gray-100 mb-1'>1.  Pick your mood</h3>
                <p className='text-gray-500 mt-2'>Choose how you're feeling right now - happy, sad, romantic, energetic, calm.</p>
            </div>
            <MdDoubleArrow size={40}/>
            <div className='border-zinc-100 border shadow-gray-500 shadow-xl/30 text-lg bg-white w-80 rounded-3xl p-4 m-5'>
                <h3 className='font-bold text-xl text-gray-800 border-b border-gray-100 mb-1'>2.  AI Understands the Vibe</h3>
                <p className='text-gray-500 mt-2'>Our AI analyzes your mood and curates the right kind of food, music, and movies.</p>
            </div>
            <MdDoubleArrow size={40}/>
            <div className='border-zinc-100 border shadow-gray-500 shadow-xl/30 text-lg bg-white w-80 rounded-3xl p-4 m-5'>
                <h3 className='font-bold text-xl text-gray-800 border-b border-gray-100 mb-1'>3.  Enjoy the Experience</h3>
                <p className='text-gray-500 mt-2'>Cook with the perfect recipe, vibe with the right music, and watch something that fits the moment.</p>
            </div>
        </div>
    </div>
  )
}

export default HowItWorks