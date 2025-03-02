import {useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import BottomSheet from '.';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

export default {
  title: 'UI/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
};

export const Default = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const handlePressOpenBottomSheet = () => {
    bottomSheetRef.current?.present();
  };

  const handlePressCloseBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
  };

  return (
    <View style={{flex: 1, padding: 24}}>
      <TouchableOpacity onPress={handlePressOpenBottomSheet}>
        <Text>바텀시트 열기</Text>
      </TouchableOpacity>
      <BottomSheet ref={bottomSheetRef} snapPoints={['50%']}>
        <View style={{flex: 1, padding: 24}}>
          <Text>바텀시트 내용</Text>
          <TouchableOpacity onPress={handlePressCloseBottomSheet}>
            <Text>바텀시트 닫기</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};
