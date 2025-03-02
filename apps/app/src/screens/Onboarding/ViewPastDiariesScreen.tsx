import {StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';

export type ViewPastDiariesScreenProps = {
  onNext: () => void;
};

function ViewPastDiariesScreen({onNext}: ViewPastDiariesScreenProps) {
  return (
    <ScreenLayout>
      <View style={viewPastDiariesScreenStyle.content} />
      <View style={viewPastDiariesScreenStyle.bottomButtonContainer}>
        <Button onPress={onNext}>다음</Button>
      </View>
    </ScreenLayout>
  );
}

export default ViewPastDiariesScreen;

const viewPastDiariesScreenStyle = StyleSheet.create({
  content: {
    flex: 1,
  },
  bottomButtonContainer: {
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
});
