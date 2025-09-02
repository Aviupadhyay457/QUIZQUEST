import { progress } from "motion"
import "./QuizQuestions.css"
import { useState } from "react"
import React from "react"
import {clsx} from "clsx"
export default function QuizQuestions(props){
    const [questionsArr, setQuestionsArr]=useState(QuestionsArrFun())
    const [progressNumbers,setProgressNumbers]=useState(ProgressNumbersFun())
    const [displayTriviaData, setDisplayTriviaData]=useState({})
    console.log(displayTriviaData)

    React.useEffect(()=>{
        setDisplayTriviaData(questionsArr[0])
        },[])
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
            {id:ques.id,number:index+1,status:index===0?["active"]:["neutral"]}
        ))
        return y
    }


    function progressNumbersItemsFun(){
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
        return progressNumbersItems
    }

       
     

    function shuffleOptions(arr){
        for(let i=arr.length-1; i>=0;i--){
            let j=Math.floor(Math.random()*(i+1))

            let x=arr[i]
            arr[i]=arr[j]
            arr[j]=x
        }
        return arr
    }
    


    function handleprogressStepperClick(id){
        console.log("click working")
        displayTriviaFun(id)
        setProgressNumbers((progressNumbers)=>(
            progressNumbers.map((ques)=>{
            if(ques.id===id){
                let newStatus=ques.status.filter((stat)=>stat!=="neutral")
                return {...ques, status:newStatus.includes("active")?[...newStatus]:[...newStatus,"active"]}
            }
            if(ques.id!==id){
                let newStatus=ques.status.filter((stat)=>stat!=="active")
                return {...ques, status:newStatus.includes("neutral")?[...newStatus]:[...newStatus,"neutral"]}
            }
        })
        ))
        
    }

    function displayTriviaFun(id){
        
        for( let i=0;i<=questionsArr.length-1;i++){
            if(questionsArr[i].id===id){
                setDisplayTriviaData({...questionsArr[i]})
            }
        }
    }

    function displayTriviaItemsFunction(dataObj){
        console.log("inside fun")
        let optionsButtons=dataObj.options.map((ele)=>(
            <button key={ele}>{ele}</button>
        ))
        console.log("otp")
        return(
            <>
            <h1>{dataObj.ques.text}</h1>
            <section className="ques-options">
                {optionsButtons}
            </section>
            </>
        )
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
        <section className="quiz-page">
        <section  className="progress-section">
            {progressNumbersItemsFun()}
        </section>
        <section className="quiz-section">
            {Object.keys(displayTriviaData).length!==0 && displayTriviaItemsFunction(displayTriviaData)}
        </section>
        </section>
    )
}