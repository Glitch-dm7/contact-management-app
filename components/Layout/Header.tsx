"use client"

import { useState } from "react"
import Sidebar from "../SidebarComponent/Sidebar"
import { RxHamburgerMenu } from "react-icons/rx"
import Image from "next/image"

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />

      <header className='sticky top-0 bg-[#F5F5F5] px-10 md:px-20 py-6'>
        <div className="flex justify-between items-center">
          <button onClick={() => setIsSidebarOpen(true)}>
            <RxHamburgerMenu color="#000" size={30} />
          </button>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-[8px]">
            <Image alt="Taiyo Logo" src={"/images/Taiyo_logo.png"} width={50} height={50} />
            <h1 className="text-xl md:text-2xl">Contact Mangement</h1>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header