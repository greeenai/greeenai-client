import {useFunnel} from '@use-funnel/react-navigation-native';
import {OnboardingFunnelScreenMap} from '../../types/OnboardingFunnelScreen';
import LoginScreen from './LoginScreen';
import TermsAgreementScreen from './TermsAgreementScreen';
import SelectPhotoScreen from './SelectPhotoScreen';
import ChooseAnswerScreen from './ChooseAnswerScreen';
import ViewPastDiariesScreen from './ViewPastDiariesScreen';
import ShareOnSNSScreen from './ShareOnSNSScreen';

function OnboardingFunnel() {
  const funnel = useFunnel<OnboardingFunnelScreenMap>({
    id: 'onboarding-funnel',
    initial: {
      step: 'LoginScreen',
      context: {},
    },
  });

  return (
    <funnel.Render
      LoginScreen={() => <LoginScreen />}
      TermsAgreementScreen={() => <TermsAgreementScreen />}
      SelectPhotoScreen={() => <SelectPhotoScreen />}
      ChooseAnswerScreen={() => <ChooseAnswerScreen />}
      ViewPastDiariesScreen={() => <ViewPastDiariesScreen />}
      ShareOnSNSScreen={() => <ShareOnSNSScreen />}
    />
  );
}

export default OnboardingFunnel;
