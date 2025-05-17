import {FlatList, StyleSheet} from 'react-native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import {formatDateToYYMMDD} from '../../../utils/formatDate';
import PastDiaryImageCard from '../../../components/BottomTab/PastDiary/PastDiaryImageCard';
import useNavigator from '../../../hooks/useNavigator';
import EmptyDiary from '../../../components/BottomTab/PastDiary/EmptyDiary';
import {useCallback, useState} from 'react';
import DiaryApi from '../../../apis/diary';
import {LastDiariesResponse, LastDiary} from '../../../apis/diary/index.types';
import {useFocusEffect} from '@react-navigation/native';

function PastDiaryScreen() {
  const [lastDiaries, setLastDiaries] = useState<LastDiariesResponse>([]);
  const {pastDiaryStackNavigation} = useNavigator();
  const pastDiaryContentContainerStyle =
    lastDiaries.length === 0 ? {flex: 1} : {paddingBottom: 10};

  useFocusEffect(
    useCallback(() => {
      const getLastDiaries = async () => {
        try {
          const {data: lastDiariesData} = await DiaryApi.getLastDiaries();
          setLastDiaries(lastDiariesData);
        } catch (error) {
          console.error('Failed to fetch diaries:', error);
        }
      };

      getLastDiaries();
    }, []),
  );

  const renderItem = ({
    item: {entryDate, id, imageUrl, content},
  }: {
    item: LastDiary;
  }) => {
    const formattedDate = formatDateToYYMMDD(entryDate);

    const handlePressPastDiaryScreen = () => {
      pastDiaryStackNavigation.navigate('DiaryContent', {
        id,
        entryDate,
        content,
        isPast: true,
      });
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
        data={lastDiaries}
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
