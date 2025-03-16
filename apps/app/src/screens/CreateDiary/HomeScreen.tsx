import ScreenLayout from '../../components/@common/ScreenLayout';
import Typography from '../../components/@common/Typography';

function HomeScreen() {
  return (
    <ScreenLayout>
      <Typography>
        {
          '그림일기를 만들려면, \n오늘의 일상이 담긴 사진 3장이 필요해요. \n선택하러 가볼까요?'
        }
      </Typography>
    </ScreenLayout>
  );
}

export default HomeScreen;
