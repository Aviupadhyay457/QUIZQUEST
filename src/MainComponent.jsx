import {AnimatePresence, motion} from "framer-motion"
export default function MainComponent(props){
    const colors=[]
    return(
        <section className="main-component">
            <h1 style={{}}>
            <span style={{color:"#F94E4E"}}>Q</span>
            <span style={{color:"#E857ED"}}>U</span>
            <span style={{color:"#3CE956"}}>I</span>
            <span style={{color:"#E6C642"}}>Z</span>
            <span style={{color:"#685AF5"}}>Q</span>
            <span style={{color:"#A656FD"}}>U</span>
            <span style={{color:"#3CE956"}}>E</span>
            <span style={{color:"#E857ED"}}>S</span>
            <span style={{color:"#E6C642"}}>T</span>
           </h1>
            {props.startGameBtnVisible && 
            <motion.button className="start-btn"
            onClick={props.fetchTrivia} 
            initial={{opacity:0, y:20, scale:0.25}}
            animate={{opacity:1 ,y:0, scale:1}}
            transition={{duration:0.25, type:"tween",ease:"easeOut"}}   
            >
                <span className="start-btn-icon">▶</span> 
                <span className="start-btn-text">Start Quiz</span>
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