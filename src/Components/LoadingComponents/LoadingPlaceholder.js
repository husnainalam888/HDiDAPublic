import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {DarkColors} from '../../Utils/Colors';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const LoadingPlaceholder = ({children, style}) => {
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  return (
    <ShimmerPlaceholder
      style={style}
      location={[0, 1]}
      shimmerColors={
        theme == 'dark'
          ? [DarkColors.GrayLighter, DarkColors.GrayLightest]
          : ['#E0E6F3', '#C8D1E5']
      }>
      {children}
    </ShimmerPlaceholder>
  );
};

export default LoadingPlaceholder;
