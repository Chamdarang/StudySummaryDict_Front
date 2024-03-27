import { useEffect, useState } from "react"
import "../css/InfoItem.scss"
import { docDeleteApi, docEditApi, docSaveApi } from "../api/DocApiService"
import {useNavigate, useParams } from "react-router-dom"

export default function DocModifyComponent(){
    const {id}=useParams()
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const nav=useNavigate()

    useEffect(()=>initDocDetail,[])
    function initDocDetail(){
        if (id) {
            console.log(id)
            const req = docEditApi(id);
            req.then(response=>{
                console.log(response.data.data)
                setTitle(response.data.data.doc.title)
                setContent(response.data.data.doc.content)
            })
            .catch(error=>{
                console.log("?")
            })
        }else{
        }
    }
    function handleTitleChange(e){
        setTitle(e.target.value)
    }
    function handleContentChange(e){
        setContent(e.target.value)
    }
    function handleSubmit(e){
        
        docSaveApi({id:id?id:-1,title:title,content:content})
        console.log({id:id?id:-1,title:title,content:content})
        e.preventDefault()
        nav(`/d`)
    }
    function delDoc(){
        docDeleteApi({id:id})
        nav(`/d`)
    }
    return(
        <div className="mx-auto custom-w-50"> 
        <span className="list-group-item border m-2">
            <form className=" row">
                <input type="hidden" value={id}/>
                <div className="col-10 col-sm">
                    <input className="form-control mt-1" type="text" placeholder="Title" value={title} onChange={handleTitleChange}  required/>
                    <textarea className="form-control mt-1" style={{height:"80vh"}} value={content} onChange={handleContentChange} placeholder="Information" required/>
                </div>
                <div className="col-1">
                    <button type="submit" className="btn btn-sm btn-outline-primary m-1" onClick={handleSubmit}>{id?"수정":"작성"}</button>
                    <button type="button" className="btn btn-sm btn-outline-primary m-1" onClick={delDoc}>삭제</button>
                </div>
            </form>
            </span>
        </div>
    )
}
