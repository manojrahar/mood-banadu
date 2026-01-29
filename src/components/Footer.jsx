import { FaGithub } from "react-icons/fa";
import React from 'react'

const Footer = () => {
  return (
    <footer className=" text-gray-300 bg-gray-700/90 w-full flex justify-around p-3 text-sm">
        <p>© 2026 Mood Banadu. All rights reserved.</p>
        <a href="https://github.com/manojrahar"><FaGithub size={25}/></a>
    </footer>
  )
}

export default Footer