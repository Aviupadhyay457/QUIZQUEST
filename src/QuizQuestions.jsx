import { progress } from "motion"
import "./QuizQuestions.css"
import { useState } from "react"
import {clsx} from "clsx"
export default function QuizQuestions(props){
    const [questionsArr, setQuestionsArr]=useState(QuestionsArrFun())
    const [progressNumbers,setProgressNumbers]=useState(ProgressNumbersFun())

    // console.log( props.responseArr)
    function QuestionsArrFun(){
         let x=props.responseArr.map((arr,index)=>(
            {
                id:arr.id,
                ques:arr.question,
                options:shuffleOptions([...arr.incorrectAnswers,arr.correctAnswer]),
                correctAnswer:arr.correctAnswer,
                category:arr.category
            }
        ))
        return x
    }


    function ProgressNumbersFun(){
        let y=questionsArr.map((ques,index)=>(
            {id:ques.id,number:index+1,status:["neutral"]}
        ))
        return y
    }

    console.log(questionsArr)
    console.log(progressNumbers)


    let progressNumbersItems=progressNumbers.map((ques,index)=>{
        if(index!==progressNumbers.length-1){
            return( <div key={ques.id} className="progress-outer-div">
                <button className={ClassForProgress(ques.status)} onClick={()=> handleprogressStepperClick(ques.id)}> {ques.number}
                </button>
                <div className={ClassForProgressArrow(ques)}></div>
            </div>
        )}
        else {
            return(
            <div key={ques.id} className="progress-outer-div">
                <button key={ques.id} className={ClassForProgress(ques.status)} onClick={()=> handleprogressStepperClick(ques.id)}> {ques.number}
                </button>
            </div>
            
            )
        }
        })
        console.log(progressNumbersItems)

    function shuffleOptions(arr){
        for(let i=arr.length-1; i>=0;i--){
            let j=Math.floor(Math.random()*i+1)

            let x=arr[i]
            arr[i]=arr[j]
            arr[j]=x
        }
        return arr
    }
    


    function handleprogressStepperClick(id){
        console.log("click working")
        setProgressNumbers((progressNumbers)=>(
            progressNumbers.map((ques)=>{
            if(ques.id===id){
                let newStatus=ques.status.map((stat)=>{
                    if(stat==="neutral" || stat==="active"){
                        return "active"
                    }
                })
                return {...ques, status:[...newStatus]}
            }
            if(ques.id!==id){
                let newStatus=ques.status.map((stat)=>{
                    if(stat==="active" || stat==="neutral"){
                        return "neutral"
                    }

                })
                return {...ques, status:[...newStatus]}
            }
        })
        ))

    }

    function ClassForProgress(status){
        let ClassNameForProgress=clsx({
            progressBtn:true,
            neutral: status.includes("neutral"),
            active:status.includes("active"),
        })
        return ClassNameForProgress
    }

    function ClassForProgressArrow(ques){
        let ClassNameForProgressArrow=clsx({
            progressArrow:true,
            correctArrow:ques.status.includes("correct"),
            incorrectArrow:ques.status.includes("incorrect")
        })
        return ClassNameForProgressArrow
    }
    




    // for(let i=1;i<=questionsArr.length;i++){
    //     progressNumbers.push(<div key={i} style={{color:"pink", fontSize:"30px"}} className="outer-progress-number"><div className="inner-progress-number">{i}</div></div>)
    // }

    // console.log(progressNumbers)
    // let allOptions=[...(props.responseArr.incorrectAnswers)]
    // allOptions.push(props.responseArr.correctAnswer)
    // console.log(allOptions)

    return(
        <section  className="progress-section">
            {progressNumbersItems}
        </section>
    )
}