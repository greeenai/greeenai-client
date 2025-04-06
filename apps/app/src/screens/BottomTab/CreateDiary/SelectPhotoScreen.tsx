import {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
  Alert,
} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Loading from '../../../components/@common/Loading';
import Icon from '../../../components/@common/Icon';
import useNavigator from '../../../hooks/useNavigator';
import Typography from '../../../components/@common/Typography';

const MAX_SELECTED_PHOTOS = 3;

function SelectPhotoScreen() {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoIdentifier[]>([]);

  const {createDiaryStackNavigation} = useNavigator();

  const handleNextButtonPress = () => {
    if (selectedPhotos.length === MAX_SELECTED_PHOTOS) {
      createDiaryStackNavigation.navigate('ConfirmPhoto', {
        selectedPhotos: selectedPhotos.map(photo => photo.node.image.uri),
      });
      return;
    }

    Alert.alert('알림', `사진을 ${MAX_SELECTED_PHOTOS}장 선택해주세요.`, [
      {
        text: '확인',
        style: 'default',
      },
    ]);
  };

  const fetchPhotosFromGallery = async (
    cursor: string | undefined = undefined,
  ) => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 28,
        assetType: 'Photos',
        after: cursor,
      });

      if (cursor) {
        setPhotos(prev => [...prev, ...result.edges]);
      } else {
        setPhotos(result.edges);
      }

      setEndCursor(result.page_info.end_cursor);
      setHasNextPage(result.page_info.has_next_page);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setIsLoading(false);
    }
  };

  const loadMorePhotosFromGallery = () => {
    if (hasNextPage) {
      fetchPhotosFromGallery(endCursor);
    }
  };

  const handlePhotoSelect = (photo: PhotoIdentifier) => {
    const isSelected = selectedPhotos.some(
      item => item.node.image.uri === photo.node.image.uri,
    );

    if (isSelected) {
      setSelectedPhotos(
        selectedPhotos.filter(
          item => item.node.image.uri !== photo.node.image.uri,
        ),
      );
      return;
    }

    if (selectedPhotos.length >= MAX_SELECTED_PHOTOS) {
      Alert.alert(
        '알림',
        `최대 ${MAX_SELECTED_PHOTOS}개의 사진만 선택할 수 있어요.`,
      );
      return;
    }

    setSelectedPhotos([...selectedPhotos, photo]);
  };

  const isPhotoSelected = (photo: PhotoIdentifier): boolean => {
    return selectedPhotos.some(
      item => item.node.image.uri === photo.node.image.uri,
    );
  };

  const renderPhoto = ({item}: {item: PhotoIdentifier}) => {
    const isSelected = isPhotoSelected(item);

    return (
      <TouchableOpacity
        onPress={() => handlePhotoSelect(item)}
        style={selectPhotoScreenStyle.photoContainer}>
        <Image
          source={{uri: item.node.image.uri}}
          style={selectPhotoScreenStyle.photo}
        />
        {isSelected && (
          <View style={selectPhotoScreenStyle.checkIconContainer}>
            <Icon name={'FilledCheck'} width={17} height={17} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return (
      <View style={selectPhotoScreenStyle.footer}>
        <Loading color={'black'} />
      </View>
    );
  };

  useLayoutEffect(() => {
    createDiaryStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleNextButtonPress}>
          <Typography type={'body-14'} color={'primary'}>
            다음
          </Typography>
        </TouchableOpacity>
      ),
    });
  }, [createDiaryStackNavigation, selectedPhotos]);

  useEffect(() => {
    fetchPhotosFromGallery();
  }, []);

  return (
    <ScreenLayout>
      {isLoading ? (
        <Loading color={'black'} />
      ) : (
        <FlatList
          data={photos}
          renderItem={renderPhoto}
          keyExtractor={item => item.node.image.uri}
          numColumns={4}
          contentContainerStyle={selectPhotoScreenStyle.photoList}
          columnWrapperStyle={selectPhotoScreenStyle.row}
          onEndReached={loadMorePhotosFromGallery}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={renderFooter}
        />
      )}
    </ScreenLayout>
  );
}

export default SelectPhotoScreen;

const selectPhotoScreenStyle = StyleSheet.create({
  photoList: {
    width: '100%',
    padding: 2,
  },
  row: {
    justifyContent: 'flex-start',
    marginBottom: 2,
  },
  photoContainer: {
    width: '24.7%',
    aspectRatio: 1,
    marginRight: '0.4%',
    position: 'relative',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
  checkIconContainer: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});
