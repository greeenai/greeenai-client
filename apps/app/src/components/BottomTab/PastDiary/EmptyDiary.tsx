import {StyleSheet, View, Image} from 'react-native';
import Typography from '../../@common/Typography';
import Button from '../../@common/Button';
import useNavigator from '../../../hooks/useNavigator';

function EmptyDiary() {
  const {bottomTabNavigation} = useNavigator();

  const handlePressCreateDiary = () => {
    bottomTabNavigation.navigate('CreateDiaryStackNavigator');
  };

  return (
    <View style={emptyDiaryStyle.container}>
      <Image source={require('../../../assets/images/empty-diary.png')} />
      <View>
        <Typography type={'button-14'}>아직 생성된 일기가 없어요!</Typography>
        <Typography type={'button-14'}>첫 번째 일기를 만들어보세요</Typography>
      </View>
      <Button size={'sm'} variant={'rounded'} onPress={handlePressCreateDiary}>
        그림일기 생성하기
      </Button>
    </View>
  );
}

export default EmptyDiary;

const emptyDiaryStyle = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
});
