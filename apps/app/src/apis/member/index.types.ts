export interface LoginRequestBody {
  name: string;
  email: string;
  oauthId: string;
  oAuthProvider: 'KAKAO' | 'APPLE';
}

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
