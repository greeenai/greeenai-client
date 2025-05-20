import {Image, StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type ViewPastDiariesScreenProps = {
  onNext: () => void;
};

function ViewPastDiariesScreen({onNext}: ViewPastDiariesScreenProps) {
  const viewPastDiaryImage = require('../../assets/images/past-diary-onboarding.png');

  return (
    <ScreenLayout>
      <View style={viewPastDiariesScreenStyle.content}>
        <Typography
          type={'headline-20'}
          style={viewPastDiariesScreenStyle.mainText}>
          {'지난 일기도\n다시 볼 수 있어요'}
        </Typography>
        <Typography>{'놓치고 지나간 기억들도\n다시 꺼내보아요'}</Typography>
      </View>
      <View style={viewPastDiariesScreenStyle.imageContainer}>
        <Image
          source={viewPastDiaryImage}
          style={viewPastDiariesScreenStyle.image}
        />
      </View>
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
    width: '100%',
    paddingTop: 120,
    paddingHorizontal: 40,
  },
  mainText: {
    marginBottom: 15,
  },
  imageContainer: {
    width: '100%',
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 230,
    height: 440,
  },
  bottomButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
});
