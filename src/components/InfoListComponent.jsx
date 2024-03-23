import { useEffect, useState } from "react"
import "../css/InfoItem.scss"
import { infoDeleteApi, infoModifyApi, searchApi } from "../api/SearchApiService";
import { useLocation } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
export default function InfoListComponent(){
    const [info,setInfo]=useState([])
    const [id,setId]=useState(-1)
    const [name,setName]=useState("")
    const [simpleInfo,setSimpleInfo]=useState("")
    const [tags,setTags]=useState([])
    const [tagItem,setTagItem]=useState("")
    const [page,setPage]=useState(0)
    const [size,setSize]=useState(10)
    const [totalPage,setTotalPage]=useState(0)
    const pageStrat=Math.max(0,page-5)
    const pageEnd=Math.min(totalPage,page+5)
    const pageNumbers=[...Array(pageEnd - pageStrat).keys()].map((i) => i + pageStrat)
    const param=useLocation().search
    const authContext=useAuth()
    const isAuth=authContext.isAuth
    useEffect(()=>searchInfo(),[page])
    function searchInfo(){
        console.log(page)
        console.log(pageNumbers)

        let stringified = "";
        if (param) {
        stringified = decodeURIComponent(new URLSearchParams(param).get("query"));
        }
        const req = searchApi(stringified,page,size);
        req.then(response=>{
            console.log(response.data.data)
            setInfo(response.data.data.infoList)
            setTotalPage(response.data.data.totalPage)
        })
        .catch(error=>{
            console.log("?")
        })
    }
    function deleteInfo(id){
        infoDeleteApi({id:id})
        .then(()=>{
            setInfo(info.filter(infoItem => infoItem.id != id))
            searchInfo()
            }
        )
        .catch(error=>{
            console.log(error)
        })
    }
    function setUpdateInfo(info){
        setId(info.id)
        setName(info.name)
        setSimpleInfo(info.simpleInfo)
        setTags(info.tag)
        setTagItem("")
    }
    function deleteTag(tag){
        setTags(tags.filter(tagItem => tagItem !== tag))
    }
    function handleNameChange(e){
        setName(e.target.value)
    }
    function handleSimpleInfoChange(e){
        setSimpleInfo(e.target.value)
    }
    function handleTagItemChange(e){
        setTagItem(e.target.value.toLowerCase())
    }
    function onKeyUp(e){
        if(e.target.value!== '' && e.key === ',') {
            const newTagItem=e.target.value.slice(0,-1)
            if(tags.indexOf(newTagItem)!=-1){
                setTagItem("")
                return false
            }
            let newTags= [...tags]
            newTags.push(newTagItem)
            setTags(newTags)
            setTagItem("")
        }
    }
    function onFocusOut(){
        if(tagItem && tags.indexOf(tagItem)==-1){
            let newTags= [...tags.filter(tag=>tag!=tagItem)]
            newTags.push(tagItem)
            setTags(newTags)
            setTagItem("")
        }
    }
    function handleSubmit(e){
        
        console.log({id:id,name:name,simpleInfo:simpleInfo,tag:tags})
        if(tags.length){
            infoModifyApi({id:id,name:name,simpleInfo:simpleInfo,tag:tags})
            .then(response=>{
                if(response.data.status=="Success"){
                    if(response.data.message=="Update"){
                        const tmpInfo=info.filter(infoItem => infoItem.id!= id)
                        setInfo([response.data.data.info,...tmpInfo])
                    }else{
                        setInfo([response.data.data.info,...info])
                    }
                    setName("")
                    setTags([])
                    setTagItem("")
                    setSimpleInfo("")
                    setId(-1)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }
        e.preventDefault();
    }
    function onPageChange(page){
        setPage(page)
    }
    return (
        <>
        <ul className="list-group mx-auto custom-w-50"> 
        {isAuth&&
            <span className="list-group-item border m-2">
            <label></label>
            <form className="row">
                <input type="hidden" value={id}/>
                <div className="col-10 col-sm">
                    <input className="form-control mt-1" type="text" placeholder="Name" value={name} onChange={handleNameChange}  required/>
                    <textarea className="form-control mt-1" value={simpleInfo} onChange={handleSimpleInfoChange} placeholder="Information" required/>
                    <div className="tags form-control mt-1">
                        {tags.map((tag,idx) => (
                            <span key={idx} className="tag btn btn-outline-danger" onClick={()=>deleteTag(tag)}>{tag} ✕</span>
                        ))}
                        <input type="text" value={tagItem} className="border-0" placeholder="Enter tags" onChange={handleTagItemChange} onBlur={onFocusOut} onKeyUp={onKeyUp}/>
                    </div>
                </div>
                <div className="col-1">
                    <button type="submit" className="btn btn-sm btn-outline-primary m-1" onClick={handleSubmit}>추가</button>
                </div>
            </form>
            </span>
}  
            {
                info.map(
                    info=>(
                        <li key={info.id} className="list-group-item border m-2 ">
                            <div className="row">
                                <div className="col-10 col-sm">
                                    <div className="fs-4 fw-bold mb-1">
                                        <span>{info.name}</span>
                                    </div>
                                    <div className="text-pre">{info.simpleInfo}</div>
                                    <div className="text-pre">
                                        {info.tag.map(
                                            (tag,idx)=>(
                                                <button type="button" className="tag-sm" key={tag} value={tag} >{tag}</button>
                                            )
                                        )}
                                    </div>
                                </div>
                                {isAuth&&<div className="col-1">
                                        <button className="btn btn-sm btn-outline-primary m-1" onClick={()=>setUpdateInfo(info)}>수정</button>
                                        <button className="btn btn-sm btn-outline-danger m-1" onClick={()=>deleteInfo(info.id)}>삭제</button>
                                </div>}
                            </div>
                        </li>
                    )
                )
            }
        </ul>
        <div className="mx-auto w-50 text-center">
            {page>0 &&<span key={-1} onClick={()=>onPageChange(page-1)}>Previous</span>}
            {pageNumbers.map(paging=>
            page==paging?<span key={paging} className="fw-bold p-1" onClick={()=>onPageChange(paging)}>{paging+1}</span> :<span key={paging} className="p-1" onClick={()=>onPageChange(paging)}>{paging+1}</span>
            )}
            {page<totalPage-1 &&<span key={+1} onClick={()=>onPageChange(page+1)}>Next</span>}
        </div>
        </> 
    );
}