import React, {useState} from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuiz } from "./API";
import { QuestionState, Difficulty } from "./API";
const total = 10;

function App() {
  const [loading,setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number,setNumber]= useState(0);
  const [userAnswer,setUserAnswer] = useState([]);
  const [score,setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startGame = async () => {
    const fetchedQuestions = await fetchQuiz(total,Difficulty.EASY)
    setQuestions(fetchedQuestions)

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>Quiz </h1>
      <button className="start" onClick={startGame}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions...</p>
      <QuestionCard
        questionNmbr = {number +1} 
        totalQuestion = {total}
        questions = {questions[number].question}
        answers = {questions[number].answers}
        userAnswer={ userAnswer ? userAnswer[number]:undefined}
        callback = {checkAnswer}
        />
      <button onClick={nextQuestion} className="next"> Next</button>
    </div>
  );
}

export default App;
