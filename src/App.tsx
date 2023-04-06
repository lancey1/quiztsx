import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuiz } from "./API";
import { QuestionState, Difficulty } from "./API";
import { GlobalStyle, Wrapper, Button } from "./App.styles";

const total = 10;

// Define the Answer Object keys and accepted values
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

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

  return (
    <>
      <GlobalStyle />
      <Wrapper className="App">
        <h1>Quiz built with TypeScript </h1>
        {!gameOver && <p className="score"> Score : {score}</p>}
        {gameOver && (
          <div>
            <p>Difficulty</p>
            <button onClick={() => setUserDifficulty("easy")}>Easy</button>
            <button onClick={() => setUserDifficulty("medium")}>Medium</button>
            <button onClick={() => setUserDifficulty("hard")}>Hard</button>
          </div>
        )}
        {gameOver && (
          <div>
            <p>Number of Questions</p>
            <input
              onChange={(e) => {
                setNumberofQuestions(Number(e.target.value));
              }}
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