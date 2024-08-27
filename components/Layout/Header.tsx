"use client"

import { useState } from "react"
import Sidebar from "../SidebarComponent/Sidebar"
import { RxHamburgerMenu } from "react-icons/rx"
import Image from "next/image"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {/* Sidebar component with open/close functionality */}
      <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />

      {/* Header section */}
      <header className='sticky top-0 bg-[#F5F5F5] px-10 md:px-20 py-6'>
        <div className="flex justify-between items-center">
          {/* Button to open the sidebar, displaying a hamburger menu icon */}
          <button onClick={() => setIsSidebarOpen(true)}>
            <RxHamburgerMenu color="#000" size={30} />
          </button>

          {/* Centered logo and title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-[8px]">
            <Image alt="Taiyo Logo" src={"/images/Taiyo_logo.png"} width={50} height={50} />
            <h1 className="text-xl md:text-2xl text-black">Contact Mangement</h1>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header