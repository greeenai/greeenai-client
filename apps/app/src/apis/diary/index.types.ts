export type LastDiariesResponse = LastDiary[];

export interface LastDiary {
  id: number;
  content: string;
  imageUrl: string;
  entryDate: string;
}

export type DiaryQuestionRequestBody = FormData;

export type DiaryQuestionResponseDto = {
  id: number;
  questions: Question[];
};

export interface Question {
  id: number;
  prompt: string;
  options: QuestionOption[];
}

interface QuestionOption {
  id: number;
  content: string;
  isAnswer: boolean;
}

export type DiaryQuestionAnswerRequestBody = QuestionAnswer[];

export interface QuestionAnswer {
  questionId: number;
  answerContent: string;
}
