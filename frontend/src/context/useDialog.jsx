import { createContext, useContext, useState } from "react"

const DialogContext = createContext()

export const DialogProvider = ({ children }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  return (
    <DialogContext.Provider
      value={{
        isLoginOpen,
        setIsLoginOpen,
        isLocationOpen,
        setIsLocationOpen
      }}
    >
      {children}
    </DialogContext.Provider>
  )
}

export const useDialog = () => useContext(DialogContext)