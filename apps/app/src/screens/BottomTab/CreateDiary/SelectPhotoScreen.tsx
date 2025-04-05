import {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Loading from '../../../components/@common/Loading';

function SelectPhotoScreen() {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState(true);

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

  const renderPhoto = ({item}: {item: PhotoIdentifier}) => (
    <TouchableOpacity style={selectPhotoScreenStyle.photoContainer}>
      <Image
        source={{uri: item.node.image.uri}}
        style={selectPhotoScreenStyle.photo}
      />
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!hasNextPage) return null;

    return (
      <View style={selectPhotoScreenStyle.footer}>
        <Loading color={'black'} />
      </View>
    );
  };

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
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  footer: {
    padding: 10,
    alignItems: 'center',
  },
});
