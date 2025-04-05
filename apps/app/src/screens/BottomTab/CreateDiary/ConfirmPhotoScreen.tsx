import {useRoute} from '@react-navigation/native';
import ScreenLayout from '../../../components/@common/ScreenLayout';
import Typography from '../../../components/@common/Typography';

function ConfirmPhotoScreen() {
  const route = useRoute();

  const selectedPhotos = route;

  return (
    <ScreenLayout>
      <Typography>Confirm Image Screen</Typography>
    </ScreenLayout>
  );
}

export default ConfirmPhotoScreen;
