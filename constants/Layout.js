import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  statusBarHeight: getStatusBarHeight(),
};
