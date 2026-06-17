import { createContext, useContext, useState } from "react";



export const DialogContext = createContext()

export const DialogProvider = ({children})=>{
    const [isLoginDialogOpen,setIsLoginDialogOpen] = useState(false)

    return (
        <DialogContext.Provider value={{isLoginDialogOpen,setIsLoginDialogOpen}}>
            {children}
        </DialogContext.Provider>
    )
}

export const useDialog = ()=> useContext(DialogContext) 

