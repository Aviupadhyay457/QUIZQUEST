import "./QuizQuestions.css"
export default function QuizQuestions(props){

    // console.log( props.responseArr)

    function shuffleOptions(arr){
        for(let i=arr.length-1; i>=0;i--){
            let j=Math.floor(Math.random()*i+1)

            let x=arr[i]
            arr[i]=arr[j]
            arr[j]=x
        }
        return arr
    }
    
    const questionsArr=props.responseArr.map((arr,index)=>(
        {
            key:arr.id,
            ques:arr.question,
            options:shuffleOptions([...arr.incorrectAnswers,arr.correctAnswer]),
            correctAnswer:arr.correctAnswer,
            category:arr.category
        }
    ))

    



    // let allOptions=[...(props.responseArr.incorrectAnswers)]
    // allOptions.push(props.responseArr.correctAnswer)
    // console.log(allOptions)

    return(
        <section className="progress-bar-section" >
            <div className="outer-progress-bar" >
                <div className="inner-progress-bar">
                </div>
            </div>
        </section>
    )
}