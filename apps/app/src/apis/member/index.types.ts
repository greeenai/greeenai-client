interface LoginRequestBody {
  name: string;
  email: string;
  oauthId: string;
  oauthProvider: 'kakao' | 'apple';
}

interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
