import {ChooseAnswerScreenProps} from '../screens/Onboarding/ChooseAnswerScreen';
import {TermsAgreementScreenProps} from '../screens/Onboarding/TermsAgreementScreen';
import {LoginScreenProps} from '../screens/Onboarding/LoginScreen';
import {SelectPhotoScreenProps} from '../screens/Onboarding/SelectPhotoScreen';
import {ShareOnSNSScreenProps} from '../screens/Onboarding/ShareOnSNSScreen';
import {ViewPastDiariesScreenProps} from '../screens/Onboarding/ViewPastDiariesScreen';

export type OnboardingFunnelScreenMap = {
  LoginScreen: LoginScreenProps;
  TermsAgreementScreen: TermsAgreementScreenProps;
  SelectPhotoScreen: SelectPhotoScreenProps;
  ChooseAnswerScreen: ChooseAnswerScreenProps;
  ViewPastDiariesScreen: ViewPastDiariesScreenProps;
  ShareOnSNSScreen: ShareOnSNSScreenProps;
};
