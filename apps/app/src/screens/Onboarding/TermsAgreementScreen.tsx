import {Text} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type TermsAgreementScreenProps = {};

function TermsAgreementScreen({}: TermsAgreementScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>TermsAgreement Screen</Text>
    </ScreenLayout>
  );
}

export default TermsAgreementScreen;
