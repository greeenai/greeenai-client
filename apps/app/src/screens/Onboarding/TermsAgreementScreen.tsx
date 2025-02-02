import {Text, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/ScreenLayout';

export type TermsAgreementScreenProps = {onNext: () => void};

function TermsAgreementScreen({onNext}: TermsAgreementScreenProps) {
  return (
    <ScreenLayout isSafeArea>
      <Text>TermsAgreement Screen</Text>
      <TouchableOpacity onPress={onNext}>
        <Text>다음</Text>
      </TouchableOpacity>
    </ScreenLayout>
  );
}

export default TermsAgreementScreen;
