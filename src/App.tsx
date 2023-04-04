import React, {useState} from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuiz } from "./API";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle,Wrapper, Button } from "./App.styles";

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
  const [start, setStart] = useState(false);


  const startGame = async () => {
    setLoading(true)
    setGameOver(false)
    const fetchedQuestions = await fetchQuiz(total,Difficulty.EASY)
    setQuestions(fetchedQuestions)
    setScore(0);
    setUserAnswer([]);
    setNumber(0)
    setLoading(false)
    setStart(true)
  };


  const endGame = () => {
    setGameOver(true)
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
    if (nextQuestion === total - 1){
      setGameOver(true)
    } else{
      setNumber(nextQuestion)
    }
  };

  return (
    <>
    <GlobalStyle/>
    <Wrapper className="App">
      <h1>Quiz built with TypeScript </h1>
      <p className="score"> Score : {score}</p>
      {gameOver || userAnswer.length === total ? (
      <Button className="start" onClick={startGame}>Start</Button>):null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && !(userAnswer.length === total) && <QuestionCard
        questionNmbr = {number +1} 
        totalQuestion = {total}
        question = {questions[number].question}
        answers = {questions[number].answerchoices}
        userAnswer={ userAnswer ? userAnswer[number]:undefined}
        callback = {checkAnswer}
        />}
        {gameOver && {score} && userAnswer.length > 0 && <p>Game Over, Play Again</p>}
        {!loading && !gameOver && userAnswer.length === number + 1 && number !== total-1 ?
      (<Button onClick={nextQuestion} className="next"> Next</Button>):null}
    </Wrapper>
    </>
  );
}

export default App;
