import Aside from "./Aside"
import MainComponent from "./MainComponent"
import React from "react"
import { categoryArr } from "./utils/category"
import {difficultyArr} from "./utils/difficulty"

export default function App(){
  const[range,setRange]=React.useState(3)
  const[category,setCategory]=React.useState(categoryArr)
  const[difficulty,setDifficulty]=React.useState(difficultyArr)
  const startGameBtnVisible=category.some(cat=>cat.isSelected===true) && difficulty.some(dif=>dif.isSelected)
  console.log(startGameBtnVisible)
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
  
  return(
    <>
      <main>
        <Aside category={category} categoryUpdate={categoryUpdate} range={range} setRange={setRange} difficulty={difficulty} setDifficulty={setDifficulty}/>
        <MainComponent startGameBtnVisible={startGameBtnVisible}/>
      </main>
    </>
  )
}
