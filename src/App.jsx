import Aside from "./Aside"
import MainComponent from "./MainComponent"
import React from "react"
export default function App(){
  const[range,setRange]=React.useState(3)
  return(
    <>
      <main>
        <Aside range={range} setRange={setRange}/>
        <MainComponent/>
      </main>
    </>
  )
}
