import {View} from 'react-native';
import Typography from '../@common/Typography';
import {ForwardedRef, forwardRef} from 'react';
import BottomSheet, {BottomSheetRef} from '../@common/BottomSheet';

type DeleteAccountBottomSheetProps = {};

function DeleteAccountBottomSheet(
  _: DeleteAccountBottomSheetProps,
  ref: ForwardedRef<BottomSheetRef>,
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
