"use client"

import { configureStore } from "@reduxjs/toolkit"
import contactDetailsSlice from "./Features/contactDetailsSlice"

export const store = configureStore({
  reducer : {
    contactDetail : contactDetailsSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
