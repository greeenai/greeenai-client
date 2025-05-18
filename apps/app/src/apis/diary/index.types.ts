export type LastDiariesResponse = LastDiary[];

export interface LastDiary {
  id: number;
  content: string;
  imageUrl: string;
  entryDate: string;
}

export interface DiaryQuestionRequestBody {
  entryDate: string;
  photos: Blob[];
}

export interface DiaryQuestionResponseDto {
  id: number;
  content: string;
}
