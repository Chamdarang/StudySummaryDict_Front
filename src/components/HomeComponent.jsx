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
            setQuiz(response.data.data.QuizList)
            console.log("!")
        })
        .catch(error=>{
            console.log("?")
        })
    }
    function judgeQuiz(e){
        if(e.key=="Enter"){
            console.log(quiz[e.target.name])
            
            quiz[e.target.name].correct= quiz[e.target.name].name==e.target.value?1:-1
            console.log(quiz[e.target.name])
            setQuiz([...quiz])
        }
    }
    return(
        <>
        <div className="list-group mx-auto custom-w-50"> 
                {quiz.map(
                    (quizItem,idx)=>(
                        <span className={quizItem.correct==1?"border-success mb-2 form-control":quizItem.correct==-1?"border-danger mb-2 form-control ":"mb-2 form-control"} key={idx}>
                        <input name={idx} type="text" className="border " placeholder={"○".repeat(quizItem.name.length)} onKeyUp={judgeQuiz} readOnly={quizItem.correct==1?true:false}  />
                        <div>{quizItem.simpleInfo}</div>
                        </span>
                    )
                )}
                <button className="btn btn-sm btn-outline-primary m-1" onClick={updateQuiz}>새로 가져오기</button>
        </div>
        </>
    )
}