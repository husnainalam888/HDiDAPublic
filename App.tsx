import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {MenuProvider} from 'react-native-popup-menu';
import {ToastProvider} from 'react-native-toast-notifications';
import MyToast from './src/Components/MyToast';
import {LanguageProvider} from './src/Provider/LanguageProvider';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import {StripeProvider} from '@stripe/stripe-react-native';
import messaging from '@react-native-firebase/messaging';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import MyStack from './src/Navigation/Stack';
import {STRIPE_PK, getCat, getRequest} from './src/Utils/API';
import {global_storage} from './src/Utils/Utils';
import {setNavigationRef} from './src/Utils/NotificationUtils/NavigationRef';
import {connectSocket} from './src/Socket/Socket';
import {io} from 'socket.io-client';
import SplashScreen from 'react-native-splash-screen';
import {requestPayment} from './src/PaymentGateWay/GooglePayUtils';
import {signIn} from './src/Utils/GoogleLoginUtils';
import {getLocales} from 'react-native-localize';

const App = () => {
  const TAG = 'App';
  const [theme, setTheme] = useMMKVStorage('theme', global_storage, 'light');
  const [user, setUser] = useMMKVStorage('user', global_storage, null);
  const [needRefresh, setNeedRefresh] = useMMKVStorage(
    'needRefresh',
    global_storage,
    false,
  );
  const [pickers, setPickers] = useMMKVStorage('pickers', global_storage, []);
  const [popularData, setPopularData] = useMMKVStorage(
    'popularData',
    global_storage,
    [],
  );
  const [newData, setNewData] = useMMKVStorage('newData', global_storage, []);
  const [boostedData, setBoostedData] = useMMKVStorage(
    'boostedData',
    global_storage,
    [],
  );
  const [deviceToken, setDeviceToken] = useMMKVStorage(
    'deviceToken',
    global_storage,
    null,
  );
  const [filters, setFilters] = useMMKVStorage('pickers', global_storage, null);

  useEffect(() => {
    console.warn(getLocales());
    initializeApp();
    if (Platform.OS == 'android') SplashScreen.hide();
    if (user?.token) {
      connectSocket(user.id);
    }
  }, []);

  const initializeApp = async () => {
    if (user != null) {
      await getCat();
    }

    try {
      const token = await messaging().getToken();
      console.log(TAG, 'FCM Token:', token);
      setDeviceToken(token);
      const permissionToRequest = Platform.select({
        android: PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        ios: PERMISSIONS.IOS.NOTIFICATIONS,
      });

      console.log(TAG, 'PermissionToRequest:', permissionToRequest);

      const result = await check(permissionToRequest);
      if (result !== RESULTS.GRANTED) {
        const requestResult = await request(
          PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
        );
        console.log(TAG, 'RequestPermission:', requestResult);
      }
    } catch (error) {
      console.log(TAG, 'Error during initialization:', error);
    }
  };

  // const getCat = async () => {
  //   try {
  //     const response = await getRequest('category/getCat', user.token);
  //     if (response.status) {
  //       setFilters(response.data);
  //     }
  //     console.log(TAG, 'GetCat(): Response:', response);
  //   } catch (error) {
  //     console.log(TAG, 'GetCat(): Error:', error);
  //   }
  // };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StripeProvider publishableKey={STRIPE_PK}>
        <LanguageProvider initialLanguage={getLocales()[0].languageCode}>
          <MenuProvider>
            <ToastProvider
              type="custom"
              renderToast={toastOptions => <MyToast options={toastOptions} />}>
              <StatusBar barStyle="light-content" backgroundColor="black" />
              <NavigationContainer ref={setNavigationRef}>
                <MyStack />
              </NavigationContainer>
            </ToastProvider>
          </MenuProvider>
        </LanguageProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
