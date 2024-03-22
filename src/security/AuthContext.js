import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()
export const useAuth=()=>useContext(AuthContext)

export default function AuthProvider({children}){
    const [isAuth,setAuthed]=useState(false)

    function setAuth(){
        setAuthed(!isAuth)
    }
    return (
        
        <AuthContext.Provider value={{isAuth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}