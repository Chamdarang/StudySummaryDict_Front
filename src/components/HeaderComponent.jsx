import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";

export default function HeaderComponent(){
    const nav= useNavigate()
    const [query,setQuery]=useState("");
    const authContext=useAuth()

    function handleSubmit(e){
        if (query=="Chamdarango"){
            authContext.setAuth()
            setQuery("")
            e.preventDefault();
        }else{
            nav(`/l`)
        }
    }
    function onChange(e){
        setQuery(e.target.value)
    }

    return(
        <header className="py-3 mb-3 border-bottom">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <span className="h3">Study Summary Dictionary</span>
                            
                    </div>
                    <div className="col">
                        <form className="w-100" onSubmit={handleSubmit}>
                            <input type="search" name="query" onChange={onChange} className="form-control" placeholder="Search.."/>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    )
}