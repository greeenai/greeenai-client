import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import Typography from '../../components/@common/Typography';
import {screenWidth} from '../../constants/screenDimensions';
import {formatDateToYYMMDD} from '../../utils/formatDate';
import {PastDiaryImageResponseDto} from '../../types/dtos/responseDtos/PastDiary';
import {mockPastDiaryImageList} from '../../constants/mockDatas/pastDiaryImageList';

const CARD_MARGIN = 7;
const CARD_WIDTH = (screenWidth - CARD_MARGIN * 3) / 2;

function PastDiaryScreen() {
  const renderItem = ({item}: {item: PastDiaryImageResponseDto}) => {
    const formattedDate = formatDateToYYMMDD(item.createdAt);

    return (
      <TouchableOpacity style={pastDiaryScreenStyle.imageContainer}>
        <Image
          source={{uri: item.imageUrl}}
          style={pastDiaryScreenStyle.image}
        />
        <Typography type={'headline-20'} style={pastDiaryScreenStyle.date}>
          {formattedDate}
        </Typography>
      </TouchableOpacity>
    );
  };

  return (
    <ScreenLayout>
      <FlatList
        style={pastDiaryScreenStyle.imageCardListContainer}
        data={mockPastDiaryImageList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={pastDiaryScreenStyle.columnWrapper}
      />
    </ScreenLayout>
  );
}

export default PastDiaryScreen;

const pastDiaryScreenStyle = StyleSheet.create({
  imageCardListContainer: {
    width: '100%',
    padding: 7,
    display: 'flex',
    gap: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  imageContainer: {
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: 15,
  },
  date: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -CARD_WIDTH * 0.21}, {translateY: -15}],
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
