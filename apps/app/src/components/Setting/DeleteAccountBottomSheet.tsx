import {View} from 'react-native';
import Typography from '../@common/Typography';
import {forwardRef, Ref} from 'react';
import BottomSheet from '../@common/BottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

type DeleteAccountBottomSheetProps = {};

function DeleteAccountBottomSheet(
  _: DeleteAccountBottomSheetProps,
  ref: Ref<BottomSheetModal>,
) {
  return (
    <BottomSheet ref={ref}>
      <View style={{height: 205}}>
        <Typography type={'headline-20'}>정말 탈퇴하시겠어요?</Typography>
      </View>
    </BottomSheet>
  );
}

export default forwardRef(DeleteAccountBottomSheet);
