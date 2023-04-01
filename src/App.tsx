import React, {useState} from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuiz } from "./API";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle } from "./App.styles";

const total = 10;

export type AnswerObject ={
  question : string;
  answer:string;
  correct: boolean;
  correctAnswer:string
}


function App() {
  const [loading,setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber]= useState(0);
  const [userAnswer,setUserAnswer] = useState<AnswerObject[]>([]);
  const [score,setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startGame = async () => {
    setLoading(true)
    setGameOver(false)
    const fetchedQuestions = await fetchQuiz(total,Difficulty.EASY)
    setQuestions(fetchedQuestions)
    setScore(0);
    setUserAnswer([]);
    setNumber(0)
    setLoading(false)
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver){
      //  get User answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct){ setScore(prev=> prev+1)}

      const  answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswer(prev=>[...prev,answerObject])
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion===total){
      setGameOver(true)
    } else{
      setNumber(nextQuestion)
    }
  };
  return (
    <>
    <GlobalStyle/>
    <div className="App">
      <h1>Quiz built with TypeScript </h1>
      {gameOver || userAnswer.length === total ? (
      <button className="start" onClick={startGame}>Start</button>):null}
      <p className="score">Score:{score}</p>
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && !(userAnswer.length === total) &&<QuestionCard
        questionNmbr = {number +1} 
        totalQuestion = {total}
        question = {questions[number].question}
        answers = {questions[number].answerchoices}
        userAnswer={ userAnswer ? userAnswer[number]:undefined}
        callback = {checkAnswer}
        />}
        {gameOver && <p>Game Over</p>}
        {!loading && !gameOver && userAnswer.length === number + 1 && number !== total-1 ?
      (<button onClick={nextQuestion} className="next"> Next</button>):null}
    </div>
    </>
  );
}

export default App;
