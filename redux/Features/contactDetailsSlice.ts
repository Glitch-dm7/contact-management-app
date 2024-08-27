"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactDetailsType {
  id: number;
  firstName: string;
  lastName: string;
  status: boolean | null;
}

interface ContactDetailsState {
  contactDetailList: ContactDetailsType[]
  nextId: number
  editContactDetails : ContactDetailsType | null
}

const initialState: ContactDetailsState = {
  contactDetailList: [],
  nextId: 1,
  editContactDetails : null
};

const contactDetailsSlice = createSlice({
  name: "contactDetails",
  initialState,
  reducers: {
    setContactDetailList: (state, action: PayloadAction<Omit<ContactDetailsType, "id">>) => {
      const newContact = { ...action.payload, id: state.nextId }
      state.contactDetailList.push(newContact)
      state.nextId += 1
    },
    setEditContactDetails: (state, action: PayloadAction<number>) => {
      const contactToEdit = state.contactDetailList.find(contact => contact.id === action.payload);
      state.editContactDetails = contactToEdit || null;
    },
    editContact: (state, action: PayloadAction<ContactDetailsType>) => {
      const index = state.contactDetailList.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contactDetailList[index] = action.payload;
      }
      state.editContactDetails = null
    },
    deleteContact: (state, action: PayloadAction<number>) => {
      state.contactDetailList = state.contactDetailList.filter(contact => contact.id !== action.payload);
    }
  },
});

export const { setContactDetailList, setEditContactDetails, editContact, deleteContact } = contactDetailsSlice.actions;
export default contactDetailsSlice.reducer;
