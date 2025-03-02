import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';

export type ShareOnSNSScreenProps = {onNext: () => void};

function ShareOnSNSScreen({onNext}: ShareOnSNSScreenProps) {
  return (
    <ScreenLayout>
      <View style={shareOnSNSScreenStyle.content} />
      <View style={shareOnSNSScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default ShareOnSNSScreen;

const shareOnSNSScreenStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  bottomButtonContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
});
