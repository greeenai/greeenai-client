import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {forwardRef, ReactNode, Ref, useImperativeHandle, useRef} from 'react';
import {StyleProp, ViewStyle} from 'react-native';

type BottomSheetRef = {
  present: () => void;
  dismiss: () => void;
};

type BottomSheetProps = BottomSheetModalProps & {
  children: ReactNode;
  backdropOpacity?: number;
  enableBackdropDismiss?: boolean;
  style?: StyleProp<ViewStyle>;
};

function BottomSheet(
  {
    children,
    backdropOpacity = 0.7,
    enableBackdropDismiss = true,
    ...rest
  }: BottomSheetProps,
  ref: Ref<BottomSheetRef>,
) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetRef.current?.present(),
    dismiss: () => bottomSheetRef.current?.dismiss(),
  }));

  const renderBackdrop = (
    props: BottomSheetBackdropProps & {
      backdropOpacity?: number;
      enableBackdropDismiss?: boolean;
    },
  ) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={backdropOpacity}
      pressBehavior={enableBackdropDismiss ? 'close' : 'none'}
    />
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      backdropComponent={renderBackdrop}
      {...rest}>
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}

export default forwardRef<BottomSheetRef, BottomSheetProps>(BottomSheet);
