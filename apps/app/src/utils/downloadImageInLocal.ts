import {Alert, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const downloadImageToLocal = async (imageUrl: string) => {
  try {
    const {fs} = RNFetchBlob;
    const documentDir = fs.dirs.DocumentDir;
    const timestamp = new Date().getTime();
    const imagePath = `${documentDir}/diary_${timestamp}.jpg`;

    await RNFetchBlob.config({
      fileCache: true,
      path: imagePath,
    }).fetch('GET', imageUrl);

    const localImagePath =
      Platform.OS === 'ios' ? `file://${imagePath}` : imagePath;

    return localImagePath;
  } catch (error) {
    Alert.alert(
      '이미지 다운로드 실패',
      '이미지를 다운로드하는데 실패했습니다.',
    );
    return '';
  }
};
