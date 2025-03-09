import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ReactNode} from 'react';
import Checkbox from '../../@common/Checkbox';
import Icon from '../../@common/Icon';
import Typography from '../../@common/Typography';

type TermsAgreementItemProps = {
  children: ReactNode;
  isChecked: boolean;
  onChange: () => void;
  onPress?: () => void;
  showRightChevron?: boolean;
  disablePressEffect?: boolean;
};

function TermsAgreementItem({
  isChecked,
  onChange,
  children,
  onPress,
  showRightChevron = true,
  disablePressEffect = false,
}: TermsAgreementItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={disablePressEffect ? 1 : 0.2}
      style={termsAgreementItemStyle.container}>
      <View style={termsAgreementItemStyle.leftColContainer}>
        <Checkbox isChecked={isChecked} onChange={onChange} />
        <Typography type={'body-18'} color={'black'}>
          {children}
        </Typography>
      </View>
      {showRightChevron && (
        <View style={termsAgreementItemStyle.rightColContainer}>
          <Icon name={'RightChevron'} width={17} height={17} fill={'gray'} />
        </View>
      )}
    </TouchableOpacity>
  );
}

export default TermsAgreementItem;

const termsAgreementItemStyle = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  leftColContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  rightColContainer: {
    marginRight: 5,
  },
});
