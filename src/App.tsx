import React from "react";
import QuestionCard from "./components/QuestionCard";

function App() {
  const startGame = async () => {};

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>Quiz </h1>
      <button className="start" onClick={startGame}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions</p>
      <button onClick={nextQuestion} className="next"> Next</button>
    </div>
  );
}

export default App;
