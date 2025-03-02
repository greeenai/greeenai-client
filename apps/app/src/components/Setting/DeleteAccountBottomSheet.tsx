import {ForwardedRef, forwardRef} from 'react';
import {StyleSheet, View} from 'react-native';
import Typography from '../@common/Typography';
import BottomSheet, {BottomSheetRef} from '../@common/BottomSheet';
import Button from '../@common/Button';

type DeleteAccountBottomSheetProps = {};

function DeleteAccountBottomSheet(
  _: DeleteAccountBottomSheetProps,
  ref: ForwardedRef<BottomSheetRef>,
) {
  const handlePressDeleteAccountButton = () => {};

  const handlePressCloseBottomSheetButton = () => {
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.dismiss();
    }
  };

  return (
    <BottomSheet
      ref={ref}
      handleIndicatorStyle={deleteAccountBottomSheetStyle.bottomSheetIndicator}>
      <View style={deleteAccountBottomSheetStyle.bottomSheetViewContainer}>
        <View style={deleteAccountBottomSheetStyle.titleContainer}>
          <Typography type={'headline-20'}>정말 탈퇴하시겠어요?</Typography>
          <Typography type={'body-12'} color={'darkGray'}>
            생성한 그림일기들이 모두 삭제됩니다
          </Typography>
        </View>
        <View style={deleteAccountBottomSheetStyle.buttonContainer}>
          <Button width={157} onPress={handlePressDeleteAccountButton}>
            네
          </Button>
          <Button
            width={157}
            onPress={handlePressCloseBottomSheetButton}
            backgroundColor={'white'}>
            아니오
          </Button>
        </View>
      </View>
    </BottomSheet>
  );
}

export default forwardRef(DeleteAccountBottomSheet);

const deleteAccountBottomSheetStyle = StyleSheet.create({
  bottomSheetIndicator: {
    display: 'none',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  bottomSheetViewContainer: {
    height: 190,
    paddingTop: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 50,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
});
