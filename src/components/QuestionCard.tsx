import React from "react";
import { AnswerObject } from "../App";
import { QuestionCardStyle,Button } from "../App.styles";


type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) =>void;
  userAnswer: AnswerObject | undefined;
  questionNmbr: number;
  totalQuestion: number;
};

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
        <div key={index}>
          <button disabled={userAnswer?true:false} value={answer} onClick={callback}>
            {answer}
          </button>
        </div>
      ))}
    </div>
  </QuestionCardStyle>
);

export default QuestionCard;