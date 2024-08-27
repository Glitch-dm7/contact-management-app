"use client"

import { configureStore } from "@reduxjs/toolkit"
import contactDetailsSlice from "./Features/contactDetailsSlice"

// Configuring the Redux store
export const store = configureStore({

  // Adding the contactDetails slice to the store under the key 'contactDetail'
  reducer : {
    contactDetail : contactDetailsSlice
  }
})

// Defining TypeScript types for the Redux store state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDisPatch = typeof store.dispatch
