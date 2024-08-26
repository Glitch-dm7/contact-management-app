import Image from 'next/image'
import React from 'react'
import { IoClose } from 'react-icons/io5'

const Sidebar = ({
  isOpen, close
}:{
  isOpen : boolean, close : Function
}) => {
  return (
    <>
      <div className={`bg-[rgba(41,45,50,0.67)] fixed inset-0 w-full h-full z-[100] ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none delay-300'}`} onClick={() => close()}>
        <div className={`fixed top-0 left-0 h-[100dvh] ml-auto w-full sm:w-[400px] z-[101] bg-[#FFF] transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <div className='flex justify-between items-center border-b-[1px] border-[#585858] p-3'>
            <Image alt="Taiyo Logo" src={"/images/Taiyo_logo.png"} width={50} height={50} />
            <button onClick={() => close()}>
              <IoClose size={35} />
            </button>
          </div>

          
        </div>
      </div>

    </>
  )
}

export default Sidebar