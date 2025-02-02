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
      context: {
        onNext: () => {},
      },
    },
  });

  return (
    <funnel.Render
      LoginScreen={({history}) => (
        <LoginScreen onNext={() => history.push('TermsAgreementScreen')} />
      )}
      TermsAgreementScreen={({history}) => (
        <TermsAgreementScreen
          onNext={() => history.push('SelectPhotoScreen')}
        />
      )}
      SelectPhotoScreen={({history}) => (
        <SelectPhotoScreen onNext={() => history.push('ChooseAnswerScreen')} />
      )}
      ChooseAnswerScreen={({history}) => (
        <ChooseAnswerScreen
          onNext={() => history.push('ViewPastDiariesScreen')}
        />
      )}
      ViewPastDiariesScreen={({history}) => (
        <ViewPastDiariesScreen
          onNext={() => history.push('ShareOnSNSScreen')}
        />
      )}
      ShareOnSNSScreen={() => <ShareOnSNSScreen />}
    />
  );
}

export default OnboardingFunnel;
