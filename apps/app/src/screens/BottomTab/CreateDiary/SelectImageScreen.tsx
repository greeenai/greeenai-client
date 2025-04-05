import {useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {
  CameraRoll,
  PhotoIdentifier,
} from '@react-native-camera-roll/camera-roll';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Loading from '../../../components/@common/Loading';

function SelectImageScreen() {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPhotosFromGallery = async () => {
    try {
      const result = await CameraRoll.getPhotos({
        first: 28,
        assetType: 'Photos',
      });

      setPhotos(result.edges);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching photos:', error);
      setIsLoading(false);
    }
  };

  const renderPhoto = ({item}: {item: PhotoIdentifier}) => (
    <TouchableOpacity style={selectImageScreenStyle.photoContainer}>
      <Image
        source={{uri: item.node.image.uri}}
        style={selectImageScreenStyle.photo}
      />
    </TouchableOpacity>
  );

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
          contentContainerStyle={selectImageScreenStyle.photoList}
          columnWrapperStyle={selectImageScreenStyle.row}
        />
      )}
    </ScreenLayout>
  );
}

export default SelectImageScreen;

const selectImageScreenStyle = StyleSheet.create({
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
});
