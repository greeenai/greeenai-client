import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../@common/Icon';
import {theme} from '@greeenai/design-tokens';
import useNavigator from '../../hooks/useNavigator';

function CreateDiaryFloatingButton() {
  const {rootStackNavigation} = useNavigator();

  const handlePressCreateDiaryFloatingButton = () => {
    rootStackNavigation.navigate('CreateDiaryStack');
  };

  return (
    <TouchableOpacity
      onPress={handlePressCreateDiaryFloatingButton}
      style={createDiaryFloatingButtonStyle.container}>
      <Icon name={'Plus'} width={20} height={20} />
    </TouchableOpacity>
  );
}

export default CreateDiaryFloatingButton;

const createDiaryFloatingButtonStyle = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette['primary'],
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{translateX: -22}],
  },
});
