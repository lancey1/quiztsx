import React from "react";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
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
  <div>
    <p className="number">
      Question: {questionNmbr} / {totalQuestion}
    </p>
    <p dangerouslySetInnerHTML={{ __html: question }} />
    <div>
      {answers.map((answer, index) => (
        <div key={index}>
          <button disabled={userAnswer} onClick={() => callback(answer)}>
            {answer}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default QuestionCard;