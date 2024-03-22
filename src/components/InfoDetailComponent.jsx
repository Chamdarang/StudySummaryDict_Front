import { useState } from "react";
import "../css/InfoItem.css";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { Form,Field, Formik } from "formik";

export default function InfoDetailComponent() {
    const {id}=useParams()
    const [name,setName]=useState("Spring Framework")
    const [simpleInfo,setSimpleInfo]=useState("짧은 요약")
    const [detailInfo,setDetailInfo]=useState("긴\n내\n용")
    const [recentUpdate,setRecentUpdate]=useState("2024-03-02")
    const [tags,setTags]=useState(["Spring", "Backend", "Web"])
    const [tagItem,setTagItem]=useState("")
    const navi=useNavigate()

    function deleteTag(tag){
        setTags(tags.filter(tagItem => tagItem !== tag))
    }
    function onKeyPress(e){
        if(e.target.value!== '' && e.key === ',') {
            let newTags= [...tags]
            newTags.push(e.target.value)
            setTags(newTags)
            setTagItem("")
        }
    }
    function updateInfo(){
        navi("/l")
    }
    function deleteInfo(){
        navi("/d")
    }
    function validate(values){
        let errors={}
        if(values.name==''){
            errors.description="Enter Name"
        }
        if(values.simpleInfo==''){
            errors.simpleInfo="Enter Infomation"
        }
        console.log(errors)
        return errors
    }
    return (
        <article className="container mx-auto w-50">
            <Formik 
                initialValues={{name,simpleInfo,recentUpdate,tags,tagItem}}
                enableReinitialize={true}
                onClick={deleteTag}
                onKeyPress={onKeyPress}
                onSubmit={updateInfo}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
                
            >
                {value=>(
                <Form key={id} className="pb-1 mb-2 ">
                    <Field type="text" name="name" placeholder="Name" className="col form-control title my-0"/>
                    <div className="tags form-control">
                        {tags.map((tag,idx) => (
                            <span key={idx} className="tag btn btn-outline-danger" onClick={()=>deleteTag(tag)}>{tag} ✕</span>
                        ))}
                        <Field type="text" name="tagItem" className="border-0" placeholder="Enter tags" onKeyPress={onKeyPress}/>
                    </div>
                    <Field type="textarea" name="simpleInfo" className="form-control border-0" placeholder="Infomation"/>
                    <p>Recent Update: {recentUpdate}</p>
                    <div className="container">
                        <button type="submit" className="btn btn-outline-primary m-1" onSubmit={updateInfo}>수정</button>
                        <button type="button" className="btn btn-outline-danger m-1" onClick={deleteInfo}>삭제</button>
                    </div> 
                </Form>
                
                )}  
                
            </Formik>
        
        </article>
    );
}
