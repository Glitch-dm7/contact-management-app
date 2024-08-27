"use client"

import { Provider } from "react-redux"
import { store } from "./store"

export const Providers = ({children} : {children :  React.ReactNode}) => {
  return(
    // Wrapping the application with the Redux Provider
    // This makes the Redux store available to the entire component tree
    <Provider store={store}>
      {children}
    </Provider>
  )
}