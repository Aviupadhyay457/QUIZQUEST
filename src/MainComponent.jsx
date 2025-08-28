export default function MainComponent(){
    return(
        <section className="main-component">
            <h1>QUIZQUEST</h1>

            <button className="start-btn">
                <span>▶</span> Start Quiz
            </button>

            <div className="instructions">
            <p>
                Please select <strong>one or more categories</strong>, choose a 
                <strong> difficulty level</strong>, and set the <strong>number of questions </strong> 
                before you can press the Play button.
            </p>
            </div>
        </section>
    )
}