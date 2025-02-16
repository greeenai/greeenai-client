import {KeyOfPalette, theme} from '@greeenai/design-tokens';
import {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Loading from './Loading';

type ScreenLayoutProps = {
  children: ReactNode;
  isLoading?: boolean;
  isKeyboardAvoiding?: boolean;
  isSafeArea?: boolean;
  backgroundColor?: KeyOfPalette;
  style?: StyleProp<ViewStyle>
};

function ScreenLayout({
  children,
  isLoading = false,
  isKeyboardAvoiding = false,
  isSafeArea = false,
  backgroundColor = 'white',
  style,
}: ScreenLayoutProps) {
  const ViewComponent = isSafeArea ? SafeAreaView : View;

  const content = (
    <ViewComponent
      style={[
        screenLayoutStyle.view,
        {backgroundColor: theme.palette[backgroundColor]},
        style,
      ]}>
      {isLoading ? <Loading /> : children}
    </ViewComponent>
  );

  if (isKeyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={screenLayoutStyle.keyboardAvoidingView}>
        {content}
      </KeyboardAvoidingView>
    );
  }

  return content;
}

export default ScreenLayout;

const screenLayoutStyle = StyleSheet.create({
  view: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});
