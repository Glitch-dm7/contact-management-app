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
  // Retrieve the contact details to be edited from the Redux store
  const contactDetailsToBeEdited = useSelector((state:RootState) => state.contactDetail.editContactDetails)

  const [contactDetail, setContactDetail] = useState<ContactDetailsType>(contactDetailsToBeEdited || intitalContactState)
  const dispatch = useDispatch(); 

  // Handle changes to the form fields
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update the state with the new form field value
    setContactDetail(prevState => ({
      ...prevState,
      [name]: name === 'status' ? value === 'true' : value
    }));
  };

   // Handle form submission
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();

    // If the contact has no ID (i.e., it's a new contact), add it to the list
    if(contactDetail.id === 0){
      dispatch(setContactDetailList(contactDetail))
    } else {
       // Otherwise, edit the existing contact
      dispatch(editContact(contactDetail))
    }
    setStep(contactStepMaster.CONTACT_PAGE)
    
    setContactDetail(intitalContactState)
  }

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center p-[16px]">
        <div className="flex flex-col justify-center items-center w-full max-w-[640px] rounded-[14px] bg-[#f6f6f6] p-[20px] m-[8px] shadow-xl">
          {/* Conditional heading based on whether editing or adding a contact */}
          <h2 className="text-center text-xl text-black font-medium mb-[18px]">
            {
              contactDetailsToBeEdited ?
              "Edit Contact"
              :
              "Add New Contact"
            }
          </h2>

          {/* Form for creating or editing a contact */}
          <form onSubmit={handleSubmit} method="post">

            {/* First Name input field */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              First Name
              <input type="text" name="firstName" value={contactDetail.firstName} onChange={(e) => handleChange(e)} required className="mt-1 p-2 border rounded w-full" />
            </label>

            {/* Last Name input field */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Last Name
              <input type="text" name="lastName" value={contactDetail.lastName} onChange={(e) => handleChange(e)} required className="mt-1 p-2 border rounded w-full" />
            </label>

            {/* Status selection with radio buttons */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>

              <div className="flex items-center">
                {/* Radio button for "Active" status */}
                <label className="mr-4">
                  <input type="radio" name="status" value="true" required checked={contactDetail.status === true} onChange={(e) => handleChange(e)} className="mr-2" />
                  Active
                </label>

                {/* Radio button for "Inactive" status */}
                <label>
                  <input type="radio" name="status" value="false" checked={contactDetail.status === false} onChange={(e) => handleChange(e)} className="mr-2" />
                  Inactive
                </label>
              </div>
            </div>

            {/* Submit button with conditional text based on whether editing or adding a contact */}
            <button className="w-full py-[10px] bg-[#EF5550] rounded-[7px] text-white">{contactDetailsToBeEdited ? "Save Edited Contact" : "Save Contact"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateContactPage