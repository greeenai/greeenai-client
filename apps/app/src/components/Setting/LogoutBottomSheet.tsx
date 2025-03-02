import {forwardRef, Ref} from 'react';
import {View} from 'react-native';
import Typography from '../@common/Typography';
import BottomSheet from '../@common/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

type LogoutBottomSheetProps = {};

function LogoutBottomSheet(
  _: LogoutBottomSheetProps,
  ref: Ref<BottomSheetModal>,
) {
  return (
    <BottomSheet ref={ref}>
      <View style={{height: 185}}>
        <Typography type={'headline-20'}>정말 로그아웃하시겠어요?</Typography>
      </View>
    </BottomSheet>
  );
}

export default forwardRef(LogoutBottomSheet);
