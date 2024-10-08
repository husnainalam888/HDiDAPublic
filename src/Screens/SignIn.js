import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Components/Header';
import {SVG, svgWithColor} from '../SVGS/SVG';
import {Colors, DarkColors} from '../Utils/Colors';
import CountrySelector from '../Components/LanguageComp/CountrySelector';
import LoginButton from '../Components/Buttons/Button';
import {SvgFromXml} from 'react-native-svg';
import TwoWayBtn from '../Components/Buttons/TwoWayBtn';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {global_storage} from '../Utils/Utils';
import {postRequest, simplePostRequest} from '../Utils/API';
import LoadingComp from '../Components/LoadingComp';
import {useToast} from 'react-native-toast-notifications';
import {localized} from '../Utils/Strings';
import {useLanguage} from '../Provider/LanguageProvider';
import {signIn} from '../Utils/GoogleLoginUtils';
import {messaging} from '@react-native-firebase/messaging';
const SignIn = ({navigation}) => {
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const {localized} = useLanguage();
  const [needRefresh, setNeedRefresh] = useMMKVStorage(
    'needRefresh',
    global_storage,
    false,
  );
  const TAG = 'SignIn';
  const Toast = useToast();
  const [user, setUser] = useMMKVStorage('user', global_storage, {});
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState({code: '92', phone: ''});
  const [deviceToken, setDeviceToken] = useMMKVStorage(
    'deviceToken',
    global_storage,
    '',
  );
  const getFcm = async () => {
    try {
      const token = await messaging().getToken();
      console.log(TAG, 'FCM Token:', token);
      setDeviceToken(token);
    } catch (e) {
      console.log(TAG, 'FCM Error:', e);
    }
  };
  const styles = styling(theme);
  const handleGuestLogin = async () => {
    try {
      setIsLoading(true);
      await getFcm();
      const response = await simplePostRequest('user/loginGuest');
      setIsLoading(false);
      console.log(TAG, 'handleGuestLogin', response.data.user);
      if (response.status) {
        setUser(response.data.user);
        navigation.navigate('BottomTabs');
        Toast.show(response.message, {
          title: 'Success',
        });
      } else
        Toast.show(response.message, {
          title: 'Error',
        });
    } catch (error) {
      console.log(TAG, 'handleGuestLogin() Error :', error);
      setIsLoading(false);
      Toast.show('Something went wrong, please try again!', {
        title: 'Error',
      });
    }
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('phone', `+${phone.code}${phone.phone}`);
      console.log(TAG, 'handleLogin formData', formData);
      const response = await simplePostRequest(
        'user/phoneLogin',
        formData,
        false,
      );
      setIsLoading(false);
      console.log(TAG, 'handleLogin', response);
      if (response.status) {
        navigation.navigate('OtpScreen', {
          token: response.data.token,
          phone: `+${phone.code}${phone.phone}`,
          otp: response.data.code,
        });
      } else {
        Toast.show(response.message, {title: 'Error'});
      }
    } catch (e) {
      setIsLoading(false);
      console.log(TAG, 'handleLogin() Error :', e);
      Toast.show('Something went wrong, please try again!', {title: 'Error'});
    }
  };

  const socialLoginApi = async ({user}) => {
    try {
      await getFcm();
      const formData = new FormData();
      formData.append('providerId', user?.id);
      formData.append('email', user?.email);
      formData.append('name', user?.name);
      formData.append('deviceToken', deviceToken);
      formData.append('phone', '+' + phone.code + phone.phone);
      setIsLoading(true);
      const response = await postRequest('user/socialLogin', formData);
      setIsLoading(false);
      console.log(TAG, 'socialLoginApi', response);

      if (response.status) {
        let tempUser = response.data.user;
        if (response.data.user?.isVerified) {
          setUser(response.data.user);
          navigation.reset({index: 0, routes: [{name: 'BottomTabs'}]});
        } else {
          navigation.navigate('OtpScreen', {
            token: tempUser.token,
            phone: `+${phone.code}${phone.phone}`,
            otp: tempUser.code,
          });
        }
        Toast.show(response.message, {
          title: 'Success',
        });
      } else
        Toast.show(response.message, {
          title: 'Error',
        });
    } catch (error) {
      console.log(TAG, 'socialLoginApi() Error :', error);
      setIsLoading(false);
      Toast.show('Something went wrong, please try again!', {
        title: 'Error',
      });
    }
  };

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            backgroundColor:
              theme == 'dark' ? DarkColors.GrayLightest : 'white',
          }}>
          <Header startIcon={navigation.canGoBack() && SVG.back} />
          <Text style={styles.heading}>{localized.sign_in_to_continue}</Text>
          <CountrySelector value={phone.phone} onChangeText={setPhone} />
          <View style={styles.row}>
            <View style={styles.line} />
            {(!user || user?.id != 'guest') && (
              <>
                <Text style={styles.or}>or</Text>
                <View style={styles.line} />
              </>
            )}
          </View>
          {(!user || user?.id != 'guest') && (
            <LoginButton
              onPress={handleGuestLogin}
              title={localized.sign_in_as_guest}
              icon={svgWithColor(
                'user',
                theme == 'dark' ? 'white' : Colors.Black,
              )}
              iconSize={20}
            />
          )}
          <LoginButton
            title={localized.continue_with_google}
            icon={SVG.Google}
            onPress={() => {
              signIn(userInfo => {
                socialLoginApi(userInfo);
              });
            }}
          />
          {/*
          <LoginButton title={localized.continue_with_facebook} icon={SVG.facebook} />
          <LoginButton title={localized.continue_with_apple} icon={SVG.apple} /> */}
        </View>
        <TwoWayBtn
          canGoBack={navigation.canGoBack()}
          disabled={phone.phone.length < 8}
          onPressNext={handleLogin}
        />
      </View>
      <LoadingComp isLoading={isLoading} color={'white'} />
    </SafeAreaView>
  );
};

export default SignIn;

const styling = theme =>
  StyleSheet.create({
    SafeAreaView: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
    },
    container: {
      flex: 1,
      backgroundColor: theme == 'dark' ? DarkColors.GrayLightest : 'white',
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    FlatList: {marginHorizontal: -20},
    heading: {
      color: theme == 'dark' ? 'white' : Colors.Black,
      fontSize: 20,
      fontWeight: '700',
    },
    description: {
      fontSize: 12,
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
      lineHeight: 19,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 18,
    },
    line: {
      backgroundColor: theme == 'dark' ? DarkColors.GrayMedium : '#EEF1F7',
      height: 1,
      flex: 1,
    },
    or: {
      color: theme == 'dark' ? DarkColors.abadb4 : Colors.GrayDarker,
      fontSize: 14,
      fontWeight: '600',
      marginHorizontal: 12,
    },
  });
