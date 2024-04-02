import { useEffect, useState } from "react"
import "../scss/InfoItem.scss"
import { docDeleteApi, docEditApi, docSaveApi } from "../api/DocApiService"
import {useNavigate, useParams } from "react-router-dom"

export default function DocModifyComponent(){
    const {id}=useParams()
    const [title,setTitle]=useState("")
    const [content,setContent]=useState("")
    const nav=useNavigate()
    useEffect(()=>initDocDetail(),[id])
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
            console.log("new")
        }
    }
    function handleTitleChange(e){
        setTitle(e.target.value)
    }
    function handleContentChange(e){
        setContent(e.target.value)
    }
    function handleSubmit(e){
        console.log({id:id?id:-1,title:title,content:content})
        e.preventDefault()
        docSaveApi({id:id?id:-1,title:title,content:content})
        .then(response=>{
                nav(`/d/v/${response.data.data.id}`)
        })
        .catch(error=>{
            console.log(error)
        })

        
        
    }
    function delDoc(){
        if(!window.confirm('삭제 확인')){
            return false;
        }
        docDeleteApi({id:id})
        nav(`/d`)
    }
    return(
        <div className="mx-auto custom-w-50"> 
            <span className="list-group-item  m-2">
                <form className=" row">
                    <input type="hidden" value={id}/>
                    <div className="col-sm-10">
                        <input className="form-control mt-1" type="text" placeholder="Title" value={title} onChange={handleTitleChange}  required/>
                        <textarea className="form-control mt-1" style={{height:"80vh"}} value={content} onChange={handleContentChange} placeholder="Contents" required/>
                    </div>
                    <div className="col-sm">
                        <button type="submit" className="btn btn-sm btn-outline-primary m-1" onClick={handleSubmit}>{id?"수정":"작성"}</button>
                        <button type="button" className="btn btn-sm btn-outline-primary m-1" onClick={delDoc}>삭제</button>
                    </div>
                </form>
            </span>
        </div>
    )
}
