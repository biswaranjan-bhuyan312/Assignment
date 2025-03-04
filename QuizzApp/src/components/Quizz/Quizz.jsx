import React, { useRef,useState,useEffect } from 'react'
import styles from "./Quizz.module.css"
import {data} from "../../assets/Data"

const Quizz = () => {
  let [index,setIndex] = useState(0);
  let [Question,setQuestion] = useState(data[index]);
  let [lock,setLock] = useState(false);
  let [score,setScore] = useState(0);
  let [result,setResult] = useState(false);
  let [timeLeft, setTimeLeft] = useState(10);
  
  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_Array = [option1,option2,option3,option4];

  useEffect(() => {
    if (timeLeft === 0) {
      revealCorrectAnswer(); // Auto-show correct answer when timer runs out
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount or question change
  }, [timeLeft]);

  const checkAns=(e,ans)=>{
  if(lock === false){
    if(Question.ans===ans){
      e.target.classList.add(styles.correct);
      setLock(true);
      setScore(prev=>prev+1);
    }else{
      e.target.classList.add(styles.Wrong);
      setLock(true);
      option_Array[Question.ans-1].current.classList.add(styles.correct);
    }
  }
}

const revealCorrectAnswer = () => {
  if (!lock) {
    option_Array[Question.ans - 1].current.classList.add(styles.correct);
    setLock(true);
  }
};

const next = () =>{
  if(lock===true){
    if(index === data.length-1){
      setResult(true);
      return 0;
    }
    setIndex(++index);
    setQuestion(data[index]);
    setLock(false);
    setTimeLeft(10);
    option_Array.map((option)=>{
      option.current.classList.remove(styles.Wrong);
      option.current.classList.remove(styles.correct);
      return null;
    })
  }
}

const reset = () =>{
  setIndex(0);
  setQuestion(data[0]);
  setScore(0);
  setLock(false);
  setResult(false);
  setTimeLeft(10);
}

  return (
    <>
      <div class={styles.container}>
        <h1>QuizzApp</h1>
        <hr/>
        {result?<></>:<><h2>{index+1}.{Question.question}</h2>
        <div className={styles.timer}>⏳ Time Left: {timeLeft}s</div>
        <ul>
          <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{Question.option1}</li>
          <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{Question.option2}</li>
          <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{Question.option3}</li>
          <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{Question.option4}</li>
        </ul>
        <button onClick={next}>Next</button>
        <div class={styles.index}>
          {index+1} of {data.length} Question
        </div></>}
        {result?<><h2>Your Score is {score} out of{data.length}</h2>
        <button onClick={reset}>Reset</button></>:<></>}
      </div>
    </>
  )
}

export default Quizz;