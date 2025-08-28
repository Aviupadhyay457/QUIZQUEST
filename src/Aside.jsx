import "./Aside.css"
import clsx from 'clsx';
import React from "react";

export default function Aside(props){
    const[difficultyHovered,setDifficultyHovered]=React.useState([false,false,false])

    let categoryItems=props.category.map((cat)=>(

        <button className="categories-btn"  key={cat.id} 
        onClick={()=>props.categoryUpdate(cat.id)} 
        style={{border:cat.isSelected?`2px solid ${cat.bgColor}`:"none"}}>
            <div className="category" style={{backgroundColor:cat.isSelected?cat.bgColor:""}}>
                <i className={cat.icon} style={{color:cat.isSelected?"white":""}}></i>
                <h3>{cat.name}</h3>
            </div>
        </button>
    ))

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

    // console.log(difficultyHovered)
    function handleRange(event){
        const value=event.currentTarget.value
        props.setRange(value)
    }

    // console.log(props.difficulty)
    // console.log(difficultyClass)
    // console.log(props.difficulty)
    function handleDifficulty(e){
      props.setDifficulty(e.target.value)
      
    }
    return(
        <aside>
            <section className="categories-section">
                <h2>Choose Categories</h2>
                <div className="categories-container">
                    {categoryItems}
                </div>
            </section>
            <section className="difficulty-range-wrapper">
                <section className="difficulty-section">
                    <h2>Choose Difficulty</h2>
                    <form className="difficulty-container">
                        <input type="radio" id="easy" value="easy" name="difficulty" onChange={handleDifficulty}/>
                        <label htmlFor="easy" className={clsx({selectedDifficulty:props.difficulty==="easy", hoveredOverDifficulty:difficultyHovered[0] && props.difficulty!=="easy"})} onMouseEnter={()=>toggleDificultyHover(0)} onMouseLeave={()=>toggleDificultyHover(0)} >
                            Easy</label>
                        <input type="radio" id="medium" value="medium" name="difficulty"  onChange={handleDifficulty}/>
                        <label htmlFor="medium" className={clsx({selectedDifficulty:props.difficulty==="medium", hoveredOverDifficulty:difficultyHovered[1] && props.difficulty!=="medium"})} onMouseEnter={()=>toggleDificultyHover(1)} onMouseLeave={()=>toggleDificultyHover(1)} >
                            Medium</label>
                        <input type="radio" id="hard" value="hard" name="difficulty"  onChange={handleDifficulty}/>
                        <label htmlFor="hard" className={clsx({selectedDifficulty:props.difficulty==="hard", hoveredOverDifficulty:difficultyHovered[2] && props.difficulty!=="hard"})} onMouseEnter={()=>toggleDificultyHover(2)} onMouseLeave={()=>toggleDificultyHover(2)} >
                            Hard</label>   
                    </form>
                </section>

                <section className="range-section">
                    <h2>Choose Range</h2>
                    <section className="range-container">
                        <input type="range" min="3" max="10" value={props.range} className="slider" id="quesRange" onChange={handleRange}/>
                        <h3>{props.range}</h3>
                    </section>
                </section>
            </section>

        </aside>
    )
}