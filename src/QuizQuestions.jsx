import {AnimatePresence, delay, motion} from "framer-motion"
import "./QuizQuestions.css"
import { useState } from "react"
import React from "react"
import {clsx} from "clsx"
export default function QuizQuestions(props){
    const [progressNumbers,setProgressNumbers]=useState(ProgressNumbersFun())// progressNumbers is the main array, removed question arr so that there remains a single source of truth
    const [displayTriviaData, setDisplayTriviaData]=useState({})
    const answeredChangeNotice= progressNumbers.map((ele)=>ele.answered).join("")
    const[animationDelay, setAnimationDelay]=useState(0)
    let correctlyAnsweredQuestions=progressNumbers.filter(ques=>ques.answeredCorrectly)
    console.log(correctlyAnsweredQuestions.length)
    let score=correctlyAnsweredQuestions.length
    let [showGameOver, setShowGameOver]=useState(false)
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
        let isThisFirstRender=progressNumbers.every(ques=>ques.answered===false)
        // let isEverythingAnswered=progressNumbers.every(ques=>ques.answered===true)
        

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
        // console.log(nextQuesIndex)
        // console.log(progressNumbers[nextQuesIndex])
        // handleprogressStepperClick(progressNumbers[nextQuesIndex].id) // replacing this with whole code of it, and fixing setAnimationDelay to 1.25

        let id=progressNumbers[nextQuesIndex].id

        if(isThisFirstRender){
            setAnimationDelay(0)
        }
        else{
            setAnimationDelay(1.25)
        }
        

        

        setProgressNumbers((progressNumbers)=>{

            let updated=progressNumbers.map((ques)=>{
            if(ques.id===id){
                let newStatus=ques.status.filter((stat)=>stat!=="neutral")
                return {...ques, status:newStatus.includes("active")?[...newStatus]:[...newStatus,"active"],clickFrom:"stepper"}
            }
            if(ques.id!==id){
                let newStatus=ques.status.filter((stat)=>stat!=="active")
                return {...ques, status:newStatus.includes("neutral")?[...newStatus]:[...newStatus,"neutral"]}
            }
        })

        for( let i=0;i<=updated.length-1;i++){
            if(updated[i].id===id){
                setDisplayTriviaData({...updated[i],clickFrom:"stepper"})
            }
        }
        return updated
        }
        )

        
    },[answeredChangeNotice])

    React.useEffect(()=>{
        const timer=setTimeout(()=>{
            setShowGameOver(progressNumbers.every(ques=>ques.answered===true))
        },2000)
        return function(){
            clearTimeout(timer)
        }
    },[progressNumbers.every(ques=>ques.answered===true)])


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
            clickFrom:""
            }
        ))
        return y
    }


    function progressNumbersItemsFun(){
    
    let progressNumbersItems=progressNumbers.map((ques,index)=>{
        if(index!==progressNumbers.length-1){
            return( <div key={ques.id} className="progress-outer-div">
                <motion.button className="progressBtn" 
                animate={ClassForProgress2(ques.status)}
                onClick={()=> handleprogressStepperClick(ques.id)}
                variants={{
                    neutral:{
                        backgroundColor:"#334155"
                    },
                    active:{
                        backgroundColor:"#FFFFFF",
                        color:"#000000",
                        border:'4px solid #2563eb',
                        boxShadow:'0 0 6px 2px rgba(37, 99, 235, 0.7)'
                    },
                    neutralIncorrect:{
                        backgroundColor:"#EF4444",
                        color:"#FFFFFF",
                        border:'1px solid #EF4444',  
                    },
                    neutralCorrect:{
                        backgroundColor:"#22C55E",
                        color:"#FFFFFF",
                        border:'1px solid #22C55E',  
                    },
                    activeIncorrect:{
                        backgroundColor:"#EF4444",
                        color:"#FFFFFF",
                        border:'4px solid #2563eb',  
                        boxShadow: '0 0 6px 2px rgba(37, 99, 235, 0.7)'
                    },
                    activeCorrect:{
                        backgroundColor:"#22C55E",
                        color:"#FFFFFF",
                        border:'4px solid #2563eb',  
                        boxShadow: '0 0 6px 2px rgba(37, 99, 235, 0.7)',   
                    },
                }}
                transition={{delay:animationDelay}}
                    >
                         {ques.number}
                </motion.button>
                <motion.div 
                // className={ClassForProgressArrow(ques)}
                className="progressArrow"
                initial={{backgroundColor:'#36454F'}}
                animate={{
                    backgroundColor:(ques.status.includes("correct") || ques.status.includes("inCorrect"))?'#2563EB':'#36454F'
                }}
                transition={{duration:1.25,type:"keyframes", ease:"easeOut"}}
                >
                </motion.div>
            </div>
        )}
        else {
            return(
            <div key={ques.id} className="progress-outer-div">
                <motion.button className="progressBtn" 
                animate={ClassForProgress2(ques.status)}
                onClick={()=> handleprogressStepperClick(ques.id)}
                variants={{
                    neutral:{
                        backgroundColor:"#334155"
                    },
                    active:{
                        backgroundColor:"#FFFFFF",
                        color:"#000000",
                        border:'4px solid #2563eb',
                        boxShadow:'0 0 6px 2px rgba(37, 99, 235, 0.7)'
                    },
                    neutralIncorrect:{
                        backgroundColor:"#EF4444",
                        color:"#FFFFFF",
                        border:'1px solid #EF4444',  
                    },
                    neutralCorrect:{
                        backgroundColor:"#22C55E",
                        color:"#FFFFFF",
                        border:'1px solid #22C55E',  
                    },
                    activeIncorrect:{
                        backgroundColor:"#EF4444",
                        color:"#FFFFFF",
                        border:'4px solid #2563eb',  
                        boxShadow: '0 0 6px 2px rgba(37, 99, 235, 0.7)'
                    },
                    activeCorrect:{
                        backgroundColor:"#22C55E",
                        color:"#FFFFFF",
                        border:'4px solid #2563eb',  
                        boxShadow: '0 0 6px 2px rgba(37, 99, 235, 0.7)'
                    },
                }}
                transition={{delay:animationDelay}}
                    >
                         {ques.number}
                </motion.button>
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
        setAnimationDelay(0)

        setProgressNumbers((progressNumbers)=>{

            let updated=progressNumbers.map((ques)=>{
            if(ques.id===id){
                let newStatus=ques.status.filter((stat)=>stat!=="neutral")
                return {...ques, status:newStatus.includes("active")?[...newStatus]:[...newStatus,"active"],clickFrom:"stepper"}
            }
            if(ques.id!==id){
                let newStatus=ques.status.filter((stat)=>stat!=="active")
                return {...ques, status:newStatus.includes("neutral")?[...newStatus]:[...newStatus,"neutral"]}
            }
        })

        for( let i=0;i<=updated.length-1;i++){
            if(updated[i].id===id){
                setDisplayTriviaData({...updated[i],clickFrom:"stepper"})
            }
        }
        return updated
        }
        )
    }

    function handleOptionClick(optionclickedText, id){
        
        
        setProgressNumbers((PrevProgressNumbers)=>{
            // setAnimationDelay(1.25)
            let updated=PrevProgressNumbers.map((ques)=>{
                if(ques.id===id && ques.answered===false){
                    if(ques.correctAnswer===optionclickedText){
                        return {...ques,status:[...ques.status,"correct"], optionsStatus:"correctAns", answered:true, answeredCorrectly:true}
                    }
                    else
                        {
                            let incorrectAnsStateUpdate = {...ques.incorrectAnsState}
                            incorrectAnsStateUpdate[optionclickedText]=true
                            // console.log(incorrectAnsStateUpdate)

                            return {...ques,status:[...ques.status,"inCorrect"], optionsStatus:"incorrectAns", incorrectAnsState:{...incorrectAnsStateUpdate}, answered:true}
                        }

                }
                else return ques
            })
            for( let i=0;i<=updated.length-1;i++){
                if(updated[i].id===id){
                    setDisplayTriviaData({...updated[i],clickFrom:"option"})
                }
            }
            return updated

        })
    }

    function displayTriviaItemsFunction(dataObj){
        let selectedIncorrectAns=""
        let  correctAnswer=dataObj.correctAnswer
        let isAnswered=dataObj.answered
        let classBtn=dataObj.optionsStatus==="correctAns"||dataObj.optionsStatus==="incorrectAns"?"CorrectAns":""
        let optionsButtons=dataObj.options.map((ele)=>{
            return <motion.button key={ele} onClick={()=>handleOptionClick(ele, dataObj.id)} className={ele===correctAnswer?classBtn:""} style={{backgroundColor:dataObj.incorrectAnsState[ele]===true && "#EF4444", color:dataObj.incorrectAnsState[ele]===true && "white"}}
            initial={false}
            animate={{x:classBtn && ele===correctAnswer?[0, -10, 10, -10, 10, 0]:0,y:classBtn && ele===correctAnswer?[0, -10, 10, -10, 10, 0]:0}}       
            transition={{duration:0.5,}}
            disabled={isAnswered}
            >{ele}</motion.button>
        })

        // console.log("otp")
       
        return(
            <AnimatePresence mode="wait">
                <motion.div className="quiz-div"
                    key={dataObj.id}
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: -90, opacity: 0 }}
                    transition={{ duration: 0.25, delay:dataObj.clickFrom=="option"?1.25:0}}
                >
                    <motion.h1>{dataObj.ques.text}</motion.h1>
                    <motion.section className="ques-options">
                        {optionsButtons}
                    </motion.section>
                </motion.div>
            </AnimatePresence>
            
        )
    }
    


    // function ClassForProgress(status){
    //     let ClassNameForProgress=clsx({
    //         progressBtn:true,
    //         neutral: status.includes("neutral"),
    //         active:status.includes("active"),
    //         neutralIncorrect: status.includes("neutral") && status.includes("inCorrect"),
    //         neutralCorrect:status.includes("neutral") && status.includes("correct"),
    //         activeIncorrect:status.includes("active") && status.includes("inCorrect"),
    //         activeCorrect:status.includes("active") && status.includes("correct"),
    //     })
    //     return ClassNameForProgress
    // }

    function ClassForProgress2(status){
        if(status.includes("neutral")){
            if(status.includes("inCorrect")){
                return "neutralIncorrect"
            }
            else if(status.includes("correct")){
                return "neutralCorrect"
            }
            else return "neutral"
        }
        else if(status.includes("active")){
            if(status.includes("inCorrect")){
                return "activeIncorrect"
            }
            else if(status.includes("correct")){
                return 'activeCorrect'
            }
            else return "active"
        }
        else return null
    }

    const disabledStyle = showGameOver ? { pointerEvents: 'none', opacity: '0.4' } : {}
    

    // console.log(progressNumbers)
    // console.log(isEverythingAnswered)
    return(
        <section className="quiz-page" style={{}}>
            <motion.h1 className="score"
            key={score}
            initial={{ scale:1.5, opacity: 0 }}
            animate={{scale:1, opacity: 1 }}
            exit={{ scale:1.5, opacity: 0 }}
            transition={{ duration: 0.25 }}
            
            >Score:
            <motion.span
            key={score}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 1.25 }}
            style={{
              display: "inline-block",
              transformOrigin: "center",
              backfaceVisibility: "hidden",
              opacity:showGameOver?0.4:1,
              pointerEvents:showGameOver&&"none"
            }}
          >
            {score}
          </motion.span></motion.h1>
        <section  className="progress-section"  style={disabledStyle}>
            {progressNumbersItemsFun()}
        </section>
        <section className="quiz-section" style={disabledStyle}>
            {Object.keys(displayTriviaData).length!==0 && displayTriviaItemsFunction(displayTriviaData)}
        </section>
        <section className="game-over" style={{display: showGameOver?"flex":"none"}}>
            <i className="fa-solid fa-xmark close-popup-btn" onClick={()=> setShowGameOver(false)}></i>
            <h1>Your Score</h1>
            <h2>{score}</h2>
            <motion.button className="play-again-btn"
            initial={{ rotateY:30}}
            animate={{ rotateY: 0  }}
            exit={{ rotateY: 30}}
            transition={{duration:1, repeat:Infinity}}
            onClick={()=>props.setResponseArr([])}
            >Play Again??</motion.button>
        </section>
        </section>
    )
}