import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '../../@common/Typography';
import {screenWidth} from '../../../constants/screenDimensions';

const CARD_MARGIN = 7;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;

type PastDiaryImageCardProps = {
  imageUrl: string;
  date: string;
};

function PastDiaryImageCard({imageUrl, date}: PastDiaryImageCardProps) {
  return (
    <TouchableOpacity style={pastDiaryScreenStyle.imageContainer}>
      <Image source={{uri: imageUrl}} style={pastDiaryScreenStyle.image} />
      <Typography type={'headline-20'} style={pastDiaryScreenStyle.dateText}>
        {date}
      </Typography>
    </TouchableOpacity>
  );
}

export default PastDiaryImageCard;

const pastDiaryScreenStyle = StyleSheet.create({
  imageContainer: {
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: 15,
  },
  dateText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -CARD_WIDTH * 0.21}, {translateY: -15}],
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
