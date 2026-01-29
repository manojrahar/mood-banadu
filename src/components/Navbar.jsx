import { Link } from 'react-router-dom'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='nav'>
            <a href="/"><b>Mood Banadu</b></a>
            <div className='flex gap-6
            items-center justify-between'>
                <a href="/">Home</a>
                <a href="#how-it-works">How it works?</a>
                <a href="#why-mood-banadu">Why Mood Banadu</a>
            </div>
        </nav>
    )
}
export default Navbar