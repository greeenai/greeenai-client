export type LastDiariesResponse = LastDiary[];

export interface LastDiary {
  id: number;
  content: string;
  imageUrl: string;
  entryDate: string;
}

export type DiaryQuestionRequestBody = FormData;

export type DiaryQuestionResponseDto = DiaryQuestion[];

export interface DiaryQuestion {
  id: number;
  content: string;
  entryDate: string;
  diaryQuestions: Question[];
}

export interface Question {
  id: number;
  content: string;
}
