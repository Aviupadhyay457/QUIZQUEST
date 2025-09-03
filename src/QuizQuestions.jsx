import { progress } from "motion"
import "./QuizQuestions.css"
import { useState } from "react"
import React from "react"
import {clsx} from "clsx"
export default function QuizQuestions(props){
    const [progressNumbers,setProgressNumbers]=useState(ProgressNumbersFun())// progressNumbers is the main array, removed question arr so that there remains a single source of truth
    const [displayTriviaData, setDisplayTriviaData]=useState({})
    // console.log(displayTriviaData)

    
    React.useEffect(()=>{ //for auto display of first trivia when inital load happens
        setDisplayTriviaData(progressNumbers[0])
        },[])


    function ProgressNumbersFun(){
        let y=props.responseArr.map((arr,index)=>(
            {id:arr.id,
            number:index+1,
            ques:arr.question, 
            options:shuffleOptions([...arr.incorrectAnswers,arr.correctAnswer]),  
            correctAnswer:arr.correctAnswer,
            category:arr.category,
            status:index===0?["active"]:["neutral"], 
            optionsStatus:"noClick",
            answeredCorrectly:false,
            }
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
        // console.log("click working")

        
        setProgressNumbers((progressNumbers)=>{

            let updated=progressNumbers.map((ques)=>{
            if(ques.id===id){
                let newStatus=ques.status.filter((stat)=>stat!=="neutral")
                return {...ques, status:newStatus.includes("active")?[...newStatus]:[...newStatus,"active"]}
            }
            if(ques.id!==id){
                let newStatus=ques.status.filter((stat)=>stat!=="active")
                return {...ques, status:newStatus.includes("neutral")?[...newStatus]:[...newStatus,"neutral"]}
            }
        })

        for( let i=0;i<=updated.length-1;i++){
            if(updated[i].id===id){
                setDisplayTriviaData({...updated[i]})
            }
        }
        return updated
        }
        )
    }

    function handleOptionClick(optionclickedText, id){
        setProgressNumbers((PrevProgressNumbers)=>{

            let updated=PrevProgressNumbers.map((ques)=>{
                if(ques.id===id){
                    if(ques.correctAnswer===optionclickedText){
                        return {...ques,status:[...ques.status,"correct"], optionsStatus:"correctAns"}
                    }
                    else
                        return {...ques,status:[...ques.status,"inCorrect"]}
                }
                else return ques
            })
            for( let i=0;i<=updated.length-1;i++){
                if(updated[i].id===id){
                    setDisplayTriviaData({...updated[i]})
                }
            }
            return updated

        })
    }


    // function displayTriviaFun(id){
        
    //     for( let i=0;i<=progressNumbers.length-1;i++){
    //         if(progressNumbers[i].id===id){
    //             setDisplayTriviaData({...progressNumbers[i]})
    //         }
    //     }
    // }

    function displayTriviaItemsFunction(dataObj){
        console.log(dataObj)
        let  correctAnswer=dataObj.correctAnswer
        let classBtn=dataObj.status.includes("correct")?"CorrectAns":""
        let optionsButtons=dataObj.options.map((ele)=>(
            <button key={ele} onClick={()=>handleOptionClick(ele, dataObj.id)} className={ele===correctAnswer?classBtn:""}>{ele}</button>
        ))
        // console.log("otp")
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
            neutralIncorrect: status.includes("neutral") && status.includes("inCorrect"),
            neutralCorrect:status.includes("neutral") && status.includes("correct"),
            activeIncorrect:status.includes("active") && status.includes("inCorrect"),
            activeCorrect:status.includes("active") && status.includes("correct"),
        })
        return ClassNameForProgress
    }

    function ClassForProgressArrow(ques){
        let ClassNameForProgressArrow=clsx({
            progressArrow:true,
            ArrowColor:ques.status.includes("correct") || ques.status.includes("inCorrect"),
        })
        return ClassNameForProgressArrow
    }
    
    

    // console.log(progressNumbers)
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