import {FlatList, StyleSheet} from 'react-native';
import ScreenLayout from '../../components/@common/ScreenLayout';
import {formatDateToYYMMDD} from '../../utils/formatDate';
import {PastDiaryImageResponseDto} from '../../types/dtos/responseDtos/PastDiary';
import {mockPastDiaryImageList} from '../../constants/mockDatas/pastDiaryImageList';
import PastDiaryImageCard from '../../components/BottomTab/PastDiary/PastDiaryImageCard';

function PastDiaryScreen() {
  const renderItem = ({item}: {item: PastDiaryImageResponseDto}) => {
    const formattedDate = formatDateToYYMMDD(item.createdAt);

    return <PastDiaryImageCard imageUrl={item.imageUrl} date={formattedDate} />;
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
});
