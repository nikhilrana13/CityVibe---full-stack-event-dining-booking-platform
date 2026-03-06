import { createContext, useContext, useState } from "react"

const DialogContext = createContext()

export const DialogProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [loginRedirect, setLoginRedirect] = useState(null)
  const [isLocationOpen, setIsLocationOpen] = useState(false)
   const [isEventAndDiningOpen,setIsEventAndDiningOpen] = useState(false)

  return (
    <DialogContext.Provider
      value={{
        isLoginOpen,
        setIsLoginOpen,
        isLocationOpen,
        setIsLocationOpen,
        isEventAndDiningOpen,
        setIsEventAndDiningOpen,
        loginRedirect,
        setLoginRedirect
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)