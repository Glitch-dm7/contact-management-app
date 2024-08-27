import { FaPlus } from "react-icons/fa6"
import { IoMdCloseCircle } from "react-icons/io"
import { contactStepMaster } from "../ContactDetailsPage"

const NoContactPage = ({
  setStep
} : {
  setStep : Function
}) => {
  return (
    <>
      <div className="h-full flex flex-col justify-center items-center p-[16px]">
        <div className="flex flex-col justify-center items-center w-full max-w-[640px] rounded-[14px] bg-[#f6f6f6] p-[20px] m-[8px] shadow-xl">
          {/* Button to create a new contact */}
          <button 
            className="bg-[#d9443d] hover:bg-[#ef5550] hover:shadow-md transition duration-300 ease-in-out flex items-center gap-[7px] rounded-[7px] py-[10px] px-[16px] text-white"
            onClick={() => setStep(contactStepMaster.CREATE_CONTACT_PAGE)}
          >
            <FaPlus color="white"  /> Create Contact
          </button>

          {/* Message box displayed when no contacts are found */}
          <div className="bg-[#f6f6f6] border-[1px] border-black p-[8px] flex mt-[14px] gap-[8px]">
            <IoMdCloseCircle size={50} />
            <p className="text-base">
              No Contact Found <br/>
              Please add contact from <br/>
              Create Contact Button
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NoContactPage