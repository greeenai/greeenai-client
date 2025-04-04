import {FlatList, StyleSheet} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import {formatDateToYYMMDD} from '../../../utils/formatDate';
import {PastDiaryImageResponseDto} from '../../../types/dtos/responseDtos/PastDiary';
import {mockPastDiaryImageList} from '../../../constants/mockDatas/pastDiaryImageList';
import PastDiaryImageCard from '../../../components/BottomTab/PastDiary/PastDiaryImageCard';
import useNavigator from '../../../hooks/useNavigator';
import EmptyDiary from '../../../components/BottomTab/PastDiary/EmptyDiary';

function PastDiaryScreen() {
  const {pastDiaryStackNavigation} = useNavigator();
  const pastDiaryContentContainerStyle =
    mockPastDiaryImageList.length === 0 ? {flex: 1} : {paddingBottom: 10};

  const renderItem = ({
    item: {createdAt, id, imageUrl},
  }: {
    item: PastDiaryImageResponseDto;
  }) => {
    const formattedDate = formatDateToYYMMDD(createdAt);

    const handlePressPastDiaryScreen = () => {
      pastDiaryStackNavigation.navigate('DiaryContent', {id, createdAt});
    };

    return (
      <PastDiaryImageCard
        imageUrl={imageUrl}
        date={formattedDate}
        onPress={handlePressPastDiaryScreen}
      />
    );
  };

  return (
    <ScreenLayout>
      <FlatList
        style={pastDiaryScreenStyle.imageCardListContainer}
        contentContainerStyle={pastDiaryContentContainerStyle}
        data={mockPastDiaryImageList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={pastDiaryScreenStyle.columnWrapper}
        ListEmptyComponent={EmptyDiary}
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
