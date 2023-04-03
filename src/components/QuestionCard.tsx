import React from "react";
import { AnswerObject } from "../App";
import { QuestionCardStyle } from "../App.styles";


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
  <div>
    <p className="number">
      Question: {questionNmbr} / {totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer, index) => (
        <div key={index}>
          <button disabled={userAnswer?true:false} value={answer} onClick={callback}>
            {answer}
          </button>
        </div>
      ))}
    </div>
  </div>
  </QuestionCardStyle>
);

export default QuestionCard;