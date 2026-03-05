import { createContext, useContext, useState } from "react"

const DialogContext = createContext()

export const DialogProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
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
        setIsEventAndDiningOpen
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)