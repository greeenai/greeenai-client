import {Image, StyleSheet, View} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Button from '../../components/@common/Button';
import Typography from '../../components/@common/Typography';

export type ShareOnSNSScreenProps = {onNext: () => void};

function ShareOnSNSScreen({onNext}: ShareOnSNSScreenProps) {
  const shareOnSNSImage = require('../../assets/images/share-sns-onboarding.png');

  return (
    <ScreenLayout>
      <View style={shareOnSNSScreenStyle.content}>
        <Typography type={'headline-20'} style={shareOnSNSScreenStyle.mainText}>
          {'소중한 순간을\n친구들에게 공유해봐요'}
        </Typography>
        <Typography>
          {'혼자 간직해도 좋지만,\n함께 나누면 더 특별해져요'}
        </Typography>
      </View>
      <View style={shareOnSNSScreenStyle.imageContainer}>
        <Image
          source={shareOnSNSImage}
          style={shareOnSNSScreenStyle.image}
        />
      </View>
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
    width: 320,
    height: 440,
  },
  bottomButtonContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
});
