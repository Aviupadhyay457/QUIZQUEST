import {AnimatePresence, motion} from "framer-motion"
export default function MainComponent(props){
    return(
        <section className="main-component">
            <h1>QUIZQUEST</h1>
            {props.startGameBtnVisible && 
            <motion.button className="start-btn" 
            initial={{opacity:0, y:20, scale:0.25}}
            animate={{opacity:1 ,y:0, scale:1}}
            transition={{duration:0.25, type:"tween",ease:"easeOut"}}
            
            >
                <span>▶</span> Start Quiz
            </motion.button>}
            
            <AnimatePresence>
            {!props.startGameBtnVisible &&  
            <motion.div className="instructions"
            initial={{opacity:0, y:50, scale:0.75}}
            animate={{opacity:1 ,y:0, scale:1}}
            exit={{opacity:0,y:50, scale:0.25}}
            transition={{duration:0.5, type:"tween",ease:"easeOut"}}
            >
            <p>
                Please select <strong>one or more categories</strong>, choose a 
                <strong> difficulty level</strong>, and set the <strong>number of questions </strong> 
                before you can press the Play button.
            </p>
            </motion.div>}
            </AnimatePresence>
        </section>
    )
}