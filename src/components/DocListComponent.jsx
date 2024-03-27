import { useEffect, useState } from "react"
import "../css/InfoItem.scss"
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import { docSearchApi } from "../api/DocApiService";
export default function DocListComponent(){
    const [doc,setDoc]=useState([])
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
        const req = docSearchApi(stringified,page,size);
        req.then(response=>{
            console.log(response.data.data)
            setDoc(response.data.data.docList)
            setTotalPage(response.data.data.totalPage)
        })
        .catch(error=>{
            console.log("?")
        })
    }
    function onPageChange(page){
        setPage(page)
    }
    return (
        <>
        <ul className="list-group mx-auto custom-w-50"> 
            {
                doc.map(
                    doc=>(
                        <li key={doc.id} className="list-group-item border m-2 ">
                            <div className="row">
                                <div className="col-10 col-sm">
                                    <div className="mb-1">
                                        <Link className="h6 fs-4 fw-bold" to={`/d/v/${doc.id}`} style={{textDecoration: "none"}}>{doc.title}</Link>
                                    </div>
                                    <div className="text-pre">{doc.createdDate}</div>
                                    <div className="text-pre">{doc.recentUpdate}</div>
                                </div>
                                {isAuth&&<div className="col-1">
                                        <Link to={`/d/e/${doc.id}`} className="btn btn-sm btn-outline-primary m-1" style={{textDecoration: "none"}}>수정</Link>
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