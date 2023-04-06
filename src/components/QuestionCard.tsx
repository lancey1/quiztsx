import React from "react";
import { AnswerObject } from "../App";
import { QuestionCardStyle, QuestionButton } from "../App.styles";

// Define the Props Object, and properties being passed down to component

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNmbr: number;
  totalQuestion: number;
};

//  React typescript functional component with props being passed
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNmbr,
  totalQuestion,
}) => (
  <QuestionCardStyle>
    <p className="number">
      Question: {questionNmbr} / {totalQuestion}
    </p>
    <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer, index) => (
        <QuestionButton
          key={index}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}
        >
          <button
            disabled={userAnswer ? true : false}
            value={answer}
            onClick={callback}
          >
            {answer}
          </button>
        </QuestionButton>
      ))}
    </div>
  </QuestionCardStyle>
);

export default QuestionCard;
