/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {name as appName} from './app.json';
import {arrayToObj, global_storage} from './src/Utils/Utils';
import {navigationRef} from './src/Utils/NotificationUtils/NavigationRef';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
messaging().onMessage(async remoteMessage => {
  //   console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  if (!PushNotification.channelExists('channel-id')) {
    PushNotification.createChannel(
      {
        channelId: 'channel-id', // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        largeIcon: 'ic_launcher',
      },
      created => created, // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }
  PushNotification.localNotification({
    title: remoteMessage.notification.title,
    message: remoteMessage.notification.body,
    data: {data: remoteMessage.data.data},
    soundName: 'default',
    playSound: true,
    vibrate: true,
    vibration: 300,
    priority: 'high',
    channelId: 'channel-id',
  });
});

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
    if (notification?.data?.data) {
      const parsedData = JSON.parse(notification.datas.data);
      if (parsedData?.post) {
        const item = parsedData.post || false;
        navigationRef.current?.navigate('CarDetails', {
          item,
          info: arrayToObj(item?.info || []),
          update: true,
        });
      } else if (parsedData?.type == 'message') {
        navigationRef.current?.navigate('ChatScreen', {
          author: parsedData.sender,
        });
      }
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.log(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
AppRegistry.registerComponent(appName, () => App);
