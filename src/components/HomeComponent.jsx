import { useEffect, useState } from "react"
import { quizApi } from "../api/SearchApiService"
import "../css/InfoItem.scss"

export default function HomeComponent(){
    const [quiz,setQuiz]=useState([])
    useEffect(()=>updateQuiz(),[])
    function updateQuiz(){
        quizApi()
        .then(response=>{
            console.log(response.data.data)
            setQuiz(response.data.data.quizList)
            console.log("!")
        })
        .catch(error=>{
            console.log("?")
        })
    }
    function judgeQuiz(e){
        if(e.type=="blur"||e.key=="Enter"){
            console.log(quiz[e.target.name])
            quiz[e.target.name].correct= quiz[e.target.name].name.toLowerCase()==e.target.value.toLowerCase()?1:-1
            console.log(quiz[e.target.name])
            setQuiz([...quiz])
        }
    }
    function handleAnswerChange(e){
        quiz[e.target.name].userAnswer=e.target.value
        setQuiz([...quiz])
        
    }
    return(
        <>
        <div className="list-group mx-auto custom-w-50"> 
                {quiz.map(
                    (quizItem,idx)=>(
                        <span className={quizItem.correct==1?"border-success mb-2 form-control":quizItem.correct==-1?"border-danger mb-2 form-control ":"mb-2 form-control"} key={idx}>
                        {quizItem.correct!=1?<input name={idx} type="text" className="border " placeholder={quizItem.name.replaceAll(/[가-힣\w]/g,"○")} value={quizItem.userAnswer} onChange={handleAnswerChange} onBlur={judgeQuiz} onKeyUp={judgeQuiz} readOnly={quizItem.correct==1?true:false}/>:
                        <div className="h6 fs-4 fw-bold">{quizItem.name}</div>}
                        <div className="text-pre" >{quizItem.simpleInfo}</div>
                        </span>
                    )
                )}
                <button className="btn btn-sm btn-outline-primary m-1" onClick={updateQuiz}>새로 가져오기</button>
        </div>
        </>
    )
}