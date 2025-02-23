import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Button from '../../../components/@common/Button';
import TermsAgreementItem from '../../../components/TermsAgreement/TermsAgreementItem';
import {useState} from 'react';
import useNavigator from '../../../hooks/useNavigator';
import {KeyOfOnboardingStackNavigatorParamList} from '../../../types/navigators';

const initialTermsAgreed = [
  {
    label: '(필수) 이용약관 동의',
    agreed: false,
    screen: 'RequiredTermsScreen',
  },
  {
    label: '(선택) 개인정보 동의',
    agreed: false,
    screen: 'OptionalTermsScreen',
  },
];

export type TermsAgreementScreenProps = {onNext: () => void};

function TermsAgreementScreen({onNext}: TermsAgreementScreenProps) {
  const {onboardingStackNavigation} = useNavigator();

  const [termsAgreed, setTermsAgreed] = useState(
    initialTermsAgreed.map(terms => terms.agreed),
  );

  const allTermsAgreed = termsAgreed.every(Boolean);

  const handleChangeAllTermsAgreed = () => {
    setTermsAgreed(() => termsAgreed.map(() => !allTermsAgreed));
  };

  const handleChangeTermsAgreed = (index: number) => {
    setTermsAgreed(prevTermsAgreed =>
      prevTermsAgreed.map((termsAgreed, termsIndex) =>
        termsIndex === index ? !termsAgreed : termsAgreed,
      ),
    );
  };

  return (
    <ScreenLayout>
      <View style={termsAgreementScreenStyle.content}>
        <TermsAgreementItem
          showRightChevron={false}
          onChange={handleChangeAllTermsAgreed}
          isChecked={allTermsAgreed}
          disablePressEffect>
          약관 전체 동의
        </TermsAgreementItem>
        {initialTermsAgreed.map((term, index) => (
          <TermsAgreementItem
            key={index}
            onPress={() => {
              onboardingStackNavigation.navigate(
                term.screen as KeyOfOnboardingStackNavigatorParamList,
              );
            }}
            onChange={() => handleChangeTermsAgreed(index)}
            isChecked={termsAgreed[index]}>
            {term.label}
          </TermsAgreementItem>
        ))}
      </View>
      <View style={termsAgreementScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext} disabled={!allTermsAgreed}>
          다음
        </Button>
      </View>
    </ScreenLayout>
  );
}

export default TermsAgreementScreen;

const termsAgreementScreenStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  bottomButtonContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
});
