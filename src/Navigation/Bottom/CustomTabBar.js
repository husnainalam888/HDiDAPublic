import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {SVG, svgWithColor} from '../../SVGS/SVG';
import {SvgFromXml} from 'react-native-svg';
import {Colors, DarkColors} from '../../Utils/Colors';
import {useLanguage} from '../../Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../../Utils/Utils';
import {useToast} from 'react-native-toast-notifications';
import LoginModal from '../../Components/LoginModal';

const CustomTabBar = ({state, descriptors, navigation}) => {
  const toast = useToast();
  const [theme] = useMMKVStorage('theme', global_storage, 'light');
  const styles = styling(theme);
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [appearance, setAppearance] = React.useState('dark');
  const {localized} = useLanguage();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <DropShadow
      style={{
        ...styles.shadow,
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            if (label == 'Chat' && user.id == 'guest') {
              setShowLoginModal(true);
              return;
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          let imageName = '';
          switch (route.name) {
            case 'Home':
              imageName =
                isFocused && theme == 'dark'
                  ? svgWithColor('home', DarkColors.Primary, DarkColors.Primary)
                  : isFocused && theme != 'dark'
                  ? SVG.homeFill
                  : !isFocused && theme == 'dark'
                  ? svgWithColor('home', false, DarkColors.abadb4)
                  : SVG.home;
              break;
            case 'Ads':
              imageName =
                isFocused && theme == 'dark'
                  ? SVG.darkAdsFill
                  : isFocused && theme != 'dark'
                  ? SVG.adsFill
                  : !isFocused && theme == 'dark'
                  ? svgWithColor('ads', false, DarkColors.abadb4)
                  : SVG.ads;
              break;
            case 'Sell':
              imageName = isFocused
                ? SVG.sellFill
                : theme == 'dark'
                ? svgWithColor('sell', false, DarkColors.abadb4)
                : SVG.sell;
              break;
            case 'Chat':
              imageName = isFocused
                ? SVG.chatFill
                : theme == 'dark'
                ? svgWithColor('chat', false, DarkColors.abadb4)
                : SVG.chat;
              break;
            case 'MyProfile':
              imageName = isFocused
                ? SVG.profileFill
                : theme == 'dark'
                ? svgWithColor('profile', false, DarkColors.abadb4)
                : SVG.profile;
              break;
            default:
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={
                route.name != 'Sell'
                  ? onPress
                  : () => {
                      if (label == 'Sell' && user.id == 'guest') {
                        setShowLoginModal(true);
                        return;
                      }
                      // if (
                      //   label == 'Sell' &&
                      //   (!user?.address?.city || !user?.address?.country)
                      // ) {
                      //   toast.show(
                      //     'Please add your address first to make an Ad',
                      //     {
                      //       title: 'Ad Address First',
                      //     },
                      //   );
                      //   navigation.navigate('Address');
                      //   return;
                      // }
                      if (user.id == 'guest') {
                        toast.show('Please login to sell', {
                          title: "Guest User Can't Sell",
                        });
                      } else navigation.navigate('SellStep1');
                    }
              }
              style={[styles.tab]}>
              <SvgFromXml xml={imageName} height={20} width={20} />
              <Text
                style={{
                  color: isFocused
                    ? Colors.Primary
                    : theme == 'dark'
                    ? DarkColors.abadb4
                    : Colors.GrayMedium,
                  marginTop: 8,
                }}>
                {label === 'Sell'
                  ? localized['sell']
                  : label === 'Chat'
                  ? localized['chat']
                  : label === 'MyProfile'
                  ? localized['profile']
                  : label == 'Ads'
                  ? localized['ads']
                  : localized['home']}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <LoginModal
        visible={showLoginModal}
        onLogin={() => {
          navigation.navigate('SignIn');
          setShowLoginModal(false);
        }}
        onCancel={() => {
          setShowLoginModal(false);
        }}
      />
    </DropShadow>
  );
};

const styling = theme =>
  StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: theme == 'light' ? 'white' : DarkColors.GrayLighter,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    tab: {
      flex: 1 / 4,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 22,
    },
    shadow: {
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 8,
      shadowOffset: {
        width: 2,
        height: 2,
      },
    },
  });

export default CustomTabBar;
