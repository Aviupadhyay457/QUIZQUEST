import {AnimatePresence, motion} from "framer-motion"
import "./QuizQuestions.css"
import { useState } from "react"
import React from "react"
import {clsx} from "clsx"
export default function QuizQuestions(props){
    const [progressNumbers,setProgressNumbers]=useState(ProgressNumbersFun())// progressNumbers is the main array, removed question arr so that there remains a single source of truth
    const [displayTriviaData, setDisplayTriviaData]=useState({})
    const answeredChangeNotice= progressNumbers.map((ele)=>ele.answered).join("")
    // const prevQuesNumber=React.useRef(null)
    // let dataObj=progressNumbers.find(ques=>ques.status.includes("active"))||null
    // let traversingForward=prevQuesNumber.current===null ? true : (dataObj!==null && prevQuesNumber.current<dataObj.number)
    // if(prevQuesNumber.current===1){
    //     traversingForward=true
    // }
    
    // const [nextQuesIndex, setNextQuesIndex]=useState(0)
    // console.log(displayTriviaData)

    // React.useEffect(()=>{ //for auto display of first trivia when inital load happens
    //     setDisplayTriviaData(progressNumbers[0])
    //     },[])
    
        // console.log(progressNumbers[0].status)
    
    React.useEffect(()=>{
        let nextQuesIndex=-1
        for(let i=0;i<=progressNumbers.length-1;i++){
            if(nextQuesIndex!==-1 && progressNumbers[i].status.includes("active")){
                nextQuesIndex=i+1
            }
            if(nextQuesIndex===-1){
                nextQuesIndex=0
                if(progressNumbers[0].status.includes("active")){
                    nextQuesIndex=1
                }
            }
            
        }
        if(nextQuesIndex>progressNumbers.length-1){
            nextQuesIndex=0
        }
        console.log(nextQuesIndex)
        console.log(progressNumbers[nextQuesIndex])
        handleprogressStepperClick(progressNumbers[nextQuesIndex].id)
    },[answeredChangeNotice])

    // React.useEffect(()=>{
    //     if(dataObj!=null){
    //         prevQuesNumber.current=dataObj.number
    //     }
        
    // },[dataObj])

    function ProgressNumbersFun(){
        let y=props.responseArr.map((arr,index)=>(
            {id:arr.id,
            number:index+1,
            ques:arr.question, 
            options:shuffleOptions([...arr.incorrectAnswers,arr.correctAnswer]),  
            correctAnswer:arr.correctAnswer,
            incorrectAnswers:arr.incorrectAnswers,
            incorrectAnsState:incorrectAnsStateFunc(arr.incorrectAnswers),
            category:arr.category,
            // status:index===0?["active"]:["neutral"], 
            status:["neutral"],
            optionsStatus:"noClick",
            answered:false,
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
    function incorrectAnsStateFunc(arr){
        let newObj={}
        for(let i=0;i<arr.length;i++){
            newObj[arr[i]]=false
        }
        return newObj
    }
    // function progressNumbersAnsweredArrayfunction(){
    //      return progressNumbers.map((ele)=>
    //          ele.answered
    //      )
    // }
       
    


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
                if(ques.id===id && ques.answered===false){
                    if(ques.correctAnswer===optionclickedText){
                        return {...ques,status:[...ques.status,"correct"], optionsStatus:"correctAns", answered:true, answeredCorrectly:true}
                    }
                    else
                        {
                            let incorrectAnsStateUpdate = {...ques.incorrectAnsState}
                            incorrectAnsStateUpdate[optionclickedText]=true
                            console.log(incorrectAnsStateUpdate)

                            return {...ques,status:[...ques.status,"inCorrect"], optionsStatus:"incorrectAns", incorrectAnsState:{...incorrectAnsStateUpdate}, answered:true}
                        }

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

    function displayTriviaItemsFunction(dataObj){
        let selectedIncorrectAns=""
        let  correctAnswer=dataObj.correctAnswer
        let classBtn=dataObj.optionsStatus==="correctAns"||dataObj.optionsStatus==="incorrectAns"?"CorrectAns":""
        let optionsButtons=dataObj.options.map((ele)=>{
            return <motion.button key={ele} onClick={()=>handleOptionClick(ele, dataObj.id)} className={ele===correctAnswer?classBtn:""} style={{backgroundColor:dataObj.incorrectAnsState[ele]===true && "#EF4444", color:dataObj.incorrectAnsState[ele]===true && "white"}}
            >{ele}</motion.button>
        })

        // console.log("otp")
       
        return(
            <AnimatePresence mode="wait">
                <motion.div
                    key={dataObj.id}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.h1>{dataObj.ques.text}</motion.h1>
                    <motion.section className="ques-options">
                        {optionsButtons}
                    </motion.section>
                </motion.div>
            </AnimatePresence>
            
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