import {category} from "./utils/category"
import "./Aside.css"
export default function Aside(props){
    let categoryItems=category.map((cat,index)=>(
        <button className="categories-btn"  key={index}>
            <div className="category">
                <i className={cat.icon}></i>
                <h3>{cat.name}</h3>
            </div>
        </button>
    ))

    function handleRange(event){
        const value=event.currentTarget.value
        props.setRange(value)
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
                        <input type="radio" id="easy" value="easy" name="difficulty"/>
                        <label htmlFor="easy">Easy</label>
                        <input type="radio" id="medium" value="medium" name="difficulty"/>
                        <label htmlFor="medium">Medium</label>
                        <input type="radio" id="hard" value="hard" name="difficulty"/>
                        <label htmlFor="hard">Hard</label>   
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