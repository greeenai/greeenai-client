interface LoginRequestBody {
  name: string;
  email: string;
  oauthId: string;
  oAuthProvider: 'kakao' | 'apple';
}
