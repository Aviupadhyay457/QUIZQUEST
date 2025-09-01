import Aside from "./Aside"
import MainComponent from "./MainComponent"
import QuizQuestions from "./QuizQuestions"
import React from "react"
import { categoryArr } from "./utils/category"
import {difficultyArr} from "./utils/difficulty"
import { clsx } from "clsx"

export default function App(){
  const[range,setRange]=React.useState([3])
  const[category,setCategory]=React.useState(categoryArr)
  const[difficulty,setDifficulty]=React.useState(difficultyArr)
  const startGameBtnVisible=category.some(cat=>cat.isSelected===true) && difficulty.some(dif=>dif.isSelected)
  let [responseArr, setResponseArr]=React.useState([])
  let[isLoading, setIsLoading]=React.useState(false)
  function categoryUpdate(id){
    setCategory((prevCategory)=>{
      return(
        prevCategory.map((cat)=>{
          if(cat.id===id){
            return(
              {...cat, isSelected:!(cat.isSelected)}
            )
          }
          else return {...cat}
        })
      )
    })
  }

  let categorySelectedArr=[]
  let difficultyselectedVal=""
  if(startGameBtnVisible){
    categorySelectedArr=category.filter(cat =>cat.isSelected===true).map(cat =>cat.apiName)
    for(let dif of difficulty){
      if(dif.isSelected===true){
        difficultyselectedVal=dif.level

      }
    }
  }
  let categorySelectedStr=categorySelectedArr.join(",")
  // console.log(categorySelectedStr)
  // console.log(range)
  // console.log(difficultyselectedVal)

  async function fetchTrivia(){
    try{
      setIsLoading(true)
      const res = await fetch(`https://the-trivia-api.com/v2/questions?categories=${categorySelectedStr}&difficulties=${difficultyselectedVal}&limit=${range}`)
      const data=await res.json()
      setResponseArr([...data])
      setIsLoading(false)
    }
    catch(err){
      console.error("opps something wrong:",err)
    } finally{
      setIsLoading(false)
    }
  } 



  let mainStyleClass=clsx(isLoading && 'main-for-is-loading', !isLoading && responseArr.length!=0 && 'main-for-questions')

  return(
    
      <main className={mainStyleClass}>
        { (responseArr.length===0 && !isLoading) &&
        <>
        <Aside category={category} categoryUpdate={categoryUpdate} range={range} setRange={setRange} difficulty={difficulty} setDifficulty={setDifficulty}/>
        <MainComponent startGameBtnVisible={startGameBtnVisible} fetchTrivia={()=>fetchTrivia()} />
        </>
        } 
        {isLoading && <span className="loader"></span>}
        {responseArr.length!=0 && !isLoading && <QuizQuestions responseArr={responseArr}/>}
      </main>
  )
}
