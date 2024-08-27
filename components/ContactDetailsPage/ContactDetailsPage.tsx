"use client"
import { useState } from "react"
import NoContactPage from "./Pages/NoContactPage"
import CreateContactPage from "./Pages/CreateContactPage"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import ContactPage from "./Pages/ContactPage"

// Define a contact step master to manage different views
export const contactStepMaster = {
  CONTACT_PAGE : "CONTACT_PAGE",  // Step constant for the contact list page
  CREATE_CONTACT_PAGE : "CREATE_CONTACT_PAGE" // Step constant for the create contact page
}

const ContactDetailsPage = () => {
  // Retrieve the list of contacts from the Redux store
  const contactDetailList = useSelector((state : RootState) => state.contactDetail.contactDetailList)
  const [step, setStep] = useState(contactStepMaster.CONTACT_PAGE)

  return (
    <div className="h-[calc(100dvh-78px)]">
      {
        step === contactStepMaster.CONTACT_PAGE &&
        (
          contactDetailList.length > 0 ?
          <ContactPage setStep={setStep} /> // Render ContactPage if there are contacts
          :
          <NoContactPage setStep={setStep} /> // Render NoContactPage if no contacts are found
        )
      }
      {
        step === contactStepMaster.CREATE_CONTACT_PAGE &&
        <CreateContactPage setStep={setStep} /> // Render CreateContactPage if the step is CREATE_CONTACT_PAGE
      }
    </div>
  )
}

export default ContactDetailsPage