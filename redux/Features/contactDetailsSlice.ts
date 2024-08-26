"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ContactDetailsType {
  firstName: string;
  lastName: string;
  status: boolean;
}

interface ContactDetailsState {
  contactDetailList: ContactDetailsType[];
}

const initialState: ContactDetailsState = {
  contactDetailList: [],
};

const contactDetailsSlice = createSlice({
  name: "contactDetails",
  initialState,
  reducers: {
    setContactDetailList: (state, action: PayloadAction<ContactDetailsType>) => {
      state.contactDetailList.push(action.payload);
    },
  },
});

export const { setContactDetailList } = contactDetailsSlice.actions;
export default contactDetailsSlice.reducer;
