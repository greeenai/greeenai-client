export interface LoginRequestBody {
  name: string;
  email: string;
  oauthId: string;
  oauthProvider: 'kakao' | 'apple';
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
