import { shuffleAnswers } from "./utils";

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answerchoices: string[] };

export const fetchQuiz = async (amount: number, difficulty: string) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  const questioned = data.results.map((question: Question)=>({
    ...question,
    answerchoices: shuffleAnswers([...question.incorrect_answers,question.correct_answer])
  }));
  return questioned
};
