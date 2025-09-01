import "./Aside.css"
import clsx from 'clsx';
import React from "react";

export default function Aside(props){
    const[difficultyHovered,setDifficultyHovered]=React.useState([false,false,false])

    function categoryItems(){
        let arr=props.category.map((cat)=>(
            <button className="categories-btn"  key={cat.id} 
            onClick={()=>props.categoryUpdate(cat.id)} 
            style={{border:cat.isSelected?`2px solid ${cat.bgColor}`:"none"}}>
                <div className="category" style={{backgroundColor:cat.isSelected?cat.bgColor:""}}>
                    <i className={cat.icon} style={{color:cat.isSelected?"white":""}}></i>
                    <h3>{cat.name}</h3>
                </div>
            </button>
        ))
        return arr
    }

    function difficultyItems(){
        let arr=props.difficulty.map((dif)=>{
            let difficultyClass=clsx(
                {
                selectedDifficulty:dif.isSelected,
                hoveredOverDifficulty:difficultyHovered[dif.id-1] && props.difficulty!==dif.isSelected
                }
            )
            let capitalizeFirstLetterLabel=dif.level.charAt(0).toUpperCase() + dif.level.slice(1)

            return(<div key={dif.id}>
            <input type="radio" id={dif.level} value={dif.level} name="difficulty" onChange={()=>handleDifficulty(dif.id)}/>
            <label htmlFor={dif.level} className={difficultyClass} onMouseEnter={()=>toggleDificultyHover(dif.id-1)} onMouseLeave={()=>toggleDificultyHover(dif.id-1)} >
                {capitalizeFirstLetterLabel}</label>
            </div>)
        })   
        return arr
    }

    function toggleDificultyHover(i){
        setDifficultyHovered(prevDifficultyHovered=>{
          let arr =  prevDifficultyHovered.map((val, index)=>{
                if(index===i){
                    return !val
                }
                else return val
            })
          return [...arr]
    })
    }

    function handleRange(event){
        const value=event.currentTarget.value
        props.setRange(value)
    }

    function handleDifficulty(id){
        let arr=props.difficulty.map(dif=>{
            if(dif.id===id){
                return {...dif,isSelected:!dif.isSelected}
            }
            else if(dif.id!==id && dif.isSelected){
                return {...dif,isSelected:!dif.isSelected}
            }
            else{
                return {...dif}
            }
        })
        props.setDifficulty([...arr])
    }
    return(
        <aside>
            <section className="categories-section">
                <h2>Choose Categories</h2>
                <div className="categories-container">
                    {categoryItems()}
                </div>
            </section>
            <section className="difficulty-range-wrapper">
                <section className="difficulty-section">
                    <h2>Choose Difficulty</h2>
                    <form className="difficulty-container">
                        {difficultyItems()}
                    </form>
                </section>

                <section className="range-section">
                    <h2>Questions <span></span></h2>
                    <section className="range-container">
                        <input type="range" min="3" max="10" value={props.range} className="slider" id="quesRange" onChange={handleRange}/>
                        <h3>{props.range}</h3>
                    </section>
                </section>
            </section>

        </aside>
    )
}