import {Platform} from 'react-native';

const getFilePathFromUri = async (uri: string): Promise<string> => {
  if (uri.startsWith('file://')) {
    return uri;
  }

  if (Platform.OS === 'ios') {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(uri);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('파일 변환 오류:', error);
      return uri;
    }
  }

  return uri;
};

export const buildDiaryCreateFormData = async (
  imageUris: string[],
): Promise<FormData> => {
  const formData = new FormData();

  const entryDate = new Date().toISOString().slice(0, 10);
  formData.append('entryDate', entryDate);

  try {
    if (Platform.OS === 'ios') {
      const filePromises = imageUris.map(uri => getFilePathFromUri(uri));
      const processedUris = await Promise.all(filePromises);

      processedUris.forEach((uri, index) => {
        const fileName = uri.split('/').pop() || `photo${index}.jpg`;

        const fileType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

        formData.append('photos', {
          uri: uri,
          name: fileName,
          type: fileType,
        } as any);
      });
    } else {
      imageUris.forEach((uri, index) => {
        formData.append('photos', {
          uri: uri,
          name: `photo${index}.jpg`,
          type: 'image/jpeg',
        } as any);
      });
    }
  } catch (error) {
    console.error('사진 처리 오류:', error);
    throw new Error('사진 처리 중 오류가 발생했습니다.');
  }

  return formData;
};
