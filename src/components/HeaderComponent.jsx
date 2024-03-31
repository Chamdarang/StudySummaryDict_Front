import { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import "../scss/InfoItem.scss"


export default function HeaderComponent(){
    const nav= useNavigate()
    const [query,setQuery]=useState("");
    const authContext=useAuth()

    function handleSubmit(e){
        if (query==process.env.REACT_APP_UNLOCK_FUNCTION_KEY){
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
                        <Link to="/" className="h3 custom-visible" style={{textDecoration: "none"}}>Study Summary Dictionary</Link>
                        <Link to="/" className="h3 custom-visible-sm" style={{textDecoration: "none"}}>SSD</Link>
                        <Link to="/l" className="h6 ps-2" style={{textDecoration: "none"}}>Dict</Link>
                        <Link to="/d" className="h6 ps-2" style={{textDecoration: "none"}}>Doc</Link>
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