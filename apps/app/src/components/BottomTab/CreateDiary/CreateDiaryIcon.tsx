import {StyleSheet, View} from 'react-native';
import Icon from '../../@common/Icon';
import {theme} from '@greeenai/design-tokens';

function CreateDiaryIcon() {
  return (
    <View style={createDiaryIconStyle.container}>
      <Icon name={'Plus'} width={16} height={16} />
    </View>
  );
}

export default CreateDiaryIcon;

const createDiaryIconStyle = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: theme.palette['primary'],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
