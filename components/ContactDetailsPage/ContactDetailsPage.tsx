"use client"
import { useState } from "react"
import NoContactPage from "./Pages/NoContactPage"
import CreateContactPage from "./Pages/CreateContactPage"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import ContactPage from "./Pages/ContactPage"

export const contactStepMaster = {
  CONTACT_PAGE : "CONTACT_PAGE",
  CREATE_CONTACT_PAGE : "CREATE_CONTACT_PAGE"
}

const ContactDetailsPage = () => {
  const contactDetailList = useSelector((state : RootState) => state.contactDetail.contactDetailList)
  const [step, setStep] = useState(contactStepMaster.CONTACT_PAGE)

  return (
    <div className="h-[calc(100dvh-78px)]">
      {
        step === contactStepMaster.CONTACT_PAGE &&
        (
          contactDetailList.length > 0 ?
          <ContactPage setStep={setStep} />
          :
          <NoContactPage setStep={setStep} />
        )
      }
      {
        step === contactStepMaster.CREATE_CONTACT_PAGE &&
        <CreateContactPage setStep={setStep} />
      }
    </div>
  )
}

export default ContactDetailsPage