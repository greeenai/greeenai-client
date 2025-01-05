import {Platform} from 'react-native';
import {
  PERMISSIONS,
  Permission,
  RESULTS,
  checkMultiple,
  request,
} from 'react-native-permissions';
import {AndroidPermissionMap} from 'react-native-permissions/dist/typescript/permissions.android';
import {IOSPermissionMap} from 'react-native-permissions/dist/typescript/permissions.ios';

// denied 시 설정 화면으로 ?

interface PermissionMapValue {
  name: string;
  permission: Permission;
}

type AndroidPermissionsMap = {
  [key in keyof Partial<AndroidPermissionMap>]: PermissionMapValue;
};

type IosPermissionsMap = {
  [key in keyof Partial<IOSPermissionMap>]: PermissionMapValue;
};

const androidPermissions: AndroidPermissionsMap = {
  CAMERA: {name: '카메라 권한', permission: PERMISSIONS.ANDROID.CAMERA},
  READ_EXTERNAL_STORAGE: {
    name: '외부 저장소 읽기 권한',
    permission: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  },
  WRITE_EXTERNAL_STORAGE: {
    name: '외부 저장소 쓰기 권한',
    permission: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  },
  READ_MEDIA_AUDIO: {
    name: '오디오 미디어 읽기 권한',
    permission: PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
  },
  READ_MEDIA_IMAGES: {
    name: '이미지 미디어 읽기 권한',
    permission: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
  },
  READ_MEDIA_VIDEO: {
    name: '비디오 미디어 읽기 권한',
    permission: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
  },
};

const iosPermissions: IosPermissionsMap = {
  CAMERA: {name: '카메라 권한', permission: PERMISSIONS.IOS.CAMERA},
  PHOTO_LIBRARY: {
    name: '사진 라이브러리 권한',
    permission: PERMISSIONS.IOS.PHOTO_LIBRARY,
  },
  PHOTO_LIBRARY_ADD_ONLY: {
    name: '사진 라이브러리 추가 전용 권한',
    permission: PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
  },
  MICROPHONE: {name: '마이크 권한', permission: PERMISSIONS.IOS.MICROPHONE},
};

const permissionsPerOS =
  Platform.OS === 'ios' ? iosPermissions : androidPermissions;

const getPermissions = async (
  onSuccess?: (message: string) => void,
  onError?: (message: string) => void,
) => {
  const permissionsToCheck = Object.values(permissionsPerOS);

  const checkedPermissions = await checkMultiple(
    permissionsToCheck.map(permissionsObj => permissionsObj.permission),
  );

  const permissionsHandlers = {
    [RESULTS.UNAVAILABLE]: (permissionName: string) => {
      const message = `${permissionName} 권한을 사용할 수 없습니다. 기기 설정에서 지원되지 않는 기능일 수 있습니다.`;
      console.warn(message);
      onError?.(message);
    },
    [RESULTS.GRANTED]: (permissionName: string) => {
      const message = `${permissionName} 권한이 이미 허용되었습니다.`;
      console.log(message);
      onSuccess?.(message);
    },
    [RESULTS.DENIED]: async (
      permissionName: string,
      permission: Permission,
    ) => {
      const message = `${permissionName} 권한이 거부되었습니다. 권한 요청을 시도합니다.`;
      console.log(message);
      const requested = await request(permission);

      if (requested === RESULTS.GRANTED) {
        const successMessage = `${permissionName} 권한이 허용되었습니다.`;
        console.log(successMessage);
        onSuccess?.(successMessage);
      } else {
        const errorMessage = `${permissionName} 권한 요청이 거부되었습니다.`;
        console.warn(errorMessage);
        onError?.(errorMessage);
      }
    },
    [RESULTS.LIMITED]: (permissionName: string) => {
      const message = `${permissionName} 권한이 제한적으로 허용되었습니다. 모든 기능을 사용하려면 권한을 완전히 허용해 주세요.`;
      console.warn(message);
      onError?.(message);
    },
    [RESULTS.BLOCKED]: (permissionName: string) => {
      const message = `${permissionName} 권한이 차단되었습니다. 기기 설정에서 권한을 허용해 주세요.`;
      console.error(message);
      onError?.(message);
    },
  };

  for (const [_, {name, permission}] of Object.entries(permissionsPerOS)) {
    const result = checkedPermissions[permission];
    const handler = permissionsHandlers[result];

    if (handler) {
      // 핸들러에 따라 인자 개수 수정 필요
      handler(name, permission);
    } else {
      const message = `${name} 권한에 대한 처리가 정의되지 않았습니다.`;
      console.warn(message);
      onError?.(message);
    }
  }
};

export default getPermissions;
