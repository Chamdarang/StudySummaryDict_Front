import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()
export const useAuth=()=>useContext(AuthContext)

export default function AuthProvider({children}){
    const [isAuth,setAuthed]=useState(false)

    function unlockFunction(key){
        if (key==process.env.REACT_APP_UNLOCK_FUNCTION_KEY){
            setAuthed(!isAuth)
            return true
        }else{
            return false
        }
    }

    return (
        
        <AuthContext.Provider value={{isAuth,unlockFunction}}>
            {children}
        </AuthContext.Provider>
    )
}