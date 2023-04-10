import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuiz } from "./API";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper, Button } from "./App.styles";
import { error } from "console";

const total = 10;

// Define the Answer Object keys and accepted values
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

interface ButtonState {
  [key: string]: boolean;
}

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer, setUserAnswer] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [start, setStart] = useState(false);
  const [userDifficulty, setUserDifficulty] = useState("easy");
  const [numberOfQuestions, setNumberofQuestions] = useState<number>(10);
  const [buttonState, setButtonState] = useState<ButtonState>({
    button1: false,
    button2: false,
    button3: false
  });
  

  // Start Game resets and fetches the questions to be used for the quiz
  const startGame = async () => {
    setLoading(true);
    setGameOver(false);
    const fetchedQuestions = await fetchQuiz(numberOfQuestions, userDifficulty);
    console.log(fetchedQuestions);
    setQuestions(fetchedQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
    setStart(true);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //  get User answer
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      // Add score if answer is correct
      if (correct) {
        setScore((prev) => prev + 1);
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswer((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === numberOfQuestions) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };
  // handles number of question input
  const handleNumberofQuestion = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const number = Number(event.target.value);
    if (number > 0 && number <= 50) {
      setNumberofQuestions(number);
    } else {
      setNumberofQuestions(10);
    }
  };

  function handleClick(button: keyof ButtonState) {
    setButtonState((prevState) => {
      const newState = { ...prevState };
      for (const key in newState) {
        if (key !== button) {
          newState[key] = false;
        }
      }
      newState[button] = true;
      return newState;
    });
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>Quiz built with TypeScript </h1>
        {!gameOver && <p className="score"> Score : {score}</p>}
        {gameOver && (
          <div>
            <div>
              <p>Difficulty</p>
            </div>

            <div className={"difficultydiv"}>
              <button
                className={`difficultyBtn ${buttonState.button1 ? 'active' : ''}`}
                onClick={() => handleClick('button1')}
                >
                Easy
              </button>
              <button
                className={`difficultyBtn ${buttonState.button2 ? 'active' : ''}`}
                onClick={()=>handleClick('button2')}
              >
                Medium
              </button>
              <button
                className={`difficultyBtn ${buttonState.button3 ? 'active' : ''}`}
                onClick={()=>handleClick('button3')}
              >
                Hard
              </button>
            </div>
          </div>
        )}
        {gameOver && (
          <div>
            <p>Number of Questions</p>
            <input
              onChange={handleNumberofQuestion}
              type="number"
              max={50}
              min={10}
              defaultValue={10}
            ></input>
          </div>
        )}
        {gameOver || userAnswer.length === numberOfQuestions ? (
          <Button className="start" onClick={startGame}>
            Start
          </Button>
        ) : null}
        {loading && <p>Loading Questions...</p>}
        {!loading &&
          !gameOver &&
          !(userAnswer.length === numberOfQuestions + 1) && (
            <QuestionCard
              questionNmbr={number + 1}
              totalQuestion={numberOfQuestions}
              question={questions[number].question}
              answers={questions[number].answerchoices}
              userAnswer={userAnswer ? userAnswer[number] : undefined}
              callback={checkAnswer}
            />
          )}
        {gameOver && { score } && userAnswer.length > 0 && (
          <p>Game Over, Play Again</p>
        )}
        {!loading &&
        !gameOver &&
        userAnswer.length === number + 1 &&
        number !== numberOfQuestions + 1 ? (
          <Button onClick={nextQuestion} className="next">
            Next
          </Button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
