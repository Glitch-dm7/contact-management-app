import { ContactDetailsType, editContact, setContactDetailList } from "@/redux/Features/contactDetailsSlice"
import { RootState } from "@/redux/store"
import { FormEvent, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { contactStepMaster } from "../ContactDetailsPage"

const intitalContactState = {
  id:0,
  firstName : "",
  lastName : "",
  status : null
}

const CreateContactPage = ({
  setStep
}:{
  setStep : Function
}) => {
  const contactDetailsToBeEdited = useSelector((state:RootState) => state.contactDetail.editContactDetails)
  const [contactDetail, setContactDetail] = useState<ContactDetailsType>(contactDetailsToBeEdited || intitalContactState)
  const dispatch = useDispatch(); 

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setContactDetail(prevState => ({
      ...prevState,
      [name]: name === 'status' ? value === 'true' : value
    }));
  };

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    if(contactDetail.id === 0){
      dispatch(setContactDetailList(contactDetail))
    } else {
      dispatch(editContact(contactDetail))
    }
    setStep(contactStepMaster.CONTACT_PAGE)
    
    setContactDetail(intitalContactState)
  }

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center p-[16px]">
        <div className="flex flex-col justify-center items-center w-full max-w-[640px] rounded-[14px] bg-[#f6f6f6] p-[20px] m-[8px] shadow-xl">
          <form onSubmit={handleSubmit} method="post">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
              <input type="text" name="firstName" value={contactDetail.firstName} onChange={(e) => handleChange(e)} required className="mt-1 p-2 border rounded w-full" />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
              <input type="text" name="lastName" value={contactDetail.lastName} onChange={(e) => handleChange(e)} required className="mt-1 p-2 border rounded w-full" />
            </label>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <div className="flex items-center">
                <label className="mr-4">
                  <input type="radio" name="status" value="true" required checked={contactDetail.status === true} onChange={(e) => handleChange(e)} className="mr-2" />
                    Active
                  </label>
            
                <label>
                  <input type="radio" name="status" value="false" checked={contactDetail.status === false} onChange={(e) => handleChange(e)} className="mr-2" />
                  Inactive
                </label>
              </div>
            </div>

            <button className="w-full py-[10px] bg-[#EF5550] rounded-[7px] text-white">Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateContactPage