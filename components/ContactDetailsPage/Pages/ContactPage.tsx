import { deleteContact, setEditContactDetails } from "@/redux/Features/contactDetailsSlice"
import { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { contactStepMaster } from "../ContactDetailsPage"
import Image from "next/image"
import { FaPlus } from "react-icons/fa6"
import { IoPencil } from "react-icons/io5"
import { RiDeleteBin2Fill } from "react-icons/ri"

const ContactPage = ({
  setStep
}:{
  setStep : Function
}) => {
  const contactDetailList = useSelector((state:RootState) => state.contactDetail.contactDetailList)
  const dispatch = useDispatch()

  const handleEdit = (contactId : number) => {
    dispatch(setEditContactDetails(contactId))
    setStep(contactStepMaster.CREATE_CONTACT_PAGE)
  }

  const handleDelete = (contactId : number) => {
    dispatch(deleteContact(contactId))
  }

  return (
    <>
      <div className="h-full py-[16px] px-20 overflow-auto">
        {
          contactDetailList &&
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] mb-[70px]">
            {
              contactDetailList.map((item) => (
                <div key={item.id} className="flex flex-col bg-[#F6F6F6] items-center p-[12px] rounded-[7px] gap-[6px]">
                  <Image src={"/images/profile_pic.jpg"} alt="Profile Picture" height={88} width={88} className="bg-white rounded-full" />

                  <p className="text-center">{item.firstName} {item.lastName}</p>
                  {
                  item.status ?
                  <div className="flex items-center gap-[3px]">
                    <div className="h-[10px] w-[10px] rounded-full bg-green-500"></div>
                    Active
                  </div> 
                   : 
                  <div className="flex items-center gap-[3px]">
                    <div className="h-[10px] w-[10px] rounded-full bg-yellow-500"></div>
                    Inactive
                  </div> 
                  }

                  <button onClick={() => handleEdit(item.id)} className="rounded-[3px] p-[5px] flex items-center gap-[3px] bg-yellow-600 transition duration-300 ease-in-out hover:bg-yellow-400 text-white">
                    <IoPencil /> Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="rounded-[3px] p-[5px] flex items-center gap-[3px] bg-red-600 transition duration-300 ease-in-out hover:bg-red-400 text-white">
                    <RiDeleteBin2Fill />Delete
                  </button>
                </div>
              ))
            }
          </div>
        }

        <button className="fixed bottom-5 sm:bottom-10 left-5 sm:left-10 bg-[#ef5550] p-[10px] z-10 rounded-full text-white flex items-center gap-[10px]" onClick={() => setStep(contactStepMaster.CREATE_CONTACT_PAGE)}>
          <FaPlus color="white" size={20} /> Create new contact
        </button>
      </div>
    </>
  )
}

export default ContactPage