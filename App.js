/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './src/screens/Splash'
import * as Color from './src/res/Color'
import AppContext from "./src/context/AppContext";
import AsyncStorage from '@react-native-community/async-storage'
//import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { AuthNavigator } from './navigation/AuthNavigator';
import { AppNavigator } from './navigation/AppNavigator';
import {
  StatusBar,

} from 'react-native';
const Stack = createStackNavigator();


function App() {
  const [isLoading, setLoading] = useState(true);
  const [isLogin, setLogin] = useState(false);
  const [isMessagesUpdated, updateMessages] = useState(false);

  useEffect(async () => {
    async function checkLoginStatus() {
      const KEY_IS_LOGGEDIN = 'KEY_IS_LOGGEDIN'
      let isLoggedIn = await AsyncStorage.getItem(KEY_IS_LOGGEDIN)

      setTimeout(() => {
        setLogin(isLoggedIn == '1' ? true : false)
        setLoading(false)
      }, 3000);

    }
    checkLoginStatus();
    //   await messaging().registerDeviceForRemoteMessages();

    //   const unsubscribe = messaging().onMessage(async remoteMessage => {
    //   });
    //   messaging().getToken(async token => {
    //     console.log('fcmToken', token);

    //    // alert('Token!' + JSON.stringify(token));
    //   });

    //   // Register background handler
    //   messaging().setBackgroundMessageHandler(async remoteMessage => {
    //     console.log('Message handled in the background!', remoteMessage);
    //   });
  }, [])

  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: async function (token) {
    //  console.log('TOKEN:', token);
      await AsyncStorage.setItem('DEVICE_TOKEN', token.token)

    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
     // console.log('NOTIFICATION:', notification);
      updateMessages(true)
      //  Alert.alert('New Message',notification.message);

      // process the notification
      // (required) Called when a remote is received or opened, or local notification is opened
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    onAction: function (notification) {
      // process the action
    },

    // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    onRegistrationError: function (err) {
      console.error(err.message, err);
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

  function showNotification(title, message, id, vibrate, sound, ongoing = false) {
    PushNotification.localNotification({
      /* Android Only Properties */
      id: id,
      autoCancel: true,
      vibrate: vibrate,
      vibration: vibrate ? 300 : undefined,
      priority: "high",
      visibility: "public",
      importance: "high",
      ongoing: ongoing,

      /* iOS only properties */
      //alertAction: 'view',
      userInfo: { id: id }, // required for ios local notification

      /* iOS and Android properties */
      title: title,
      message: message, // (required)
      playSound: sound,
      soundName: sound ? 'default' : undefined,
      // number: number // silly library, iOS requires number, while android string...

    });
  }

  if (isLoading) {
    return <Splash />;
  }
  return (
    <AppContext.Provider value={{ isLogin, setLogin, isMessagesUpdated, updateMessages }}>
      <StatusBar
        backgroundColor={Color.colorPrimary}
        barStyle="light-content"
      />
      <NavigationContainer>
        {isLogin ?
          (<AppNavigator />)
          :
          (<AuthNavigator />)
        }
      </NavigationContainer>
    </AppContext.Provider>

  );
}
export default App;
