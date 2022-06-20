import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    Alert
} from 'react-native';
import * as Color from '../res/Color'
import AsyncStorage from '@react-native-community/async-storage'
import AppContext from "../context/AppContext";
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
GoogleSignin.configure({
    webClientId: '1025617248546-0bohkobkdnlh5j8vi4kqttdeg3t0egha.apps.googleusercontent.com'
});
function Login({ navigation }) {
    const { setLogin } = useContext(AppContext);

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            // Sign-in the user with the credential
            const userInfo = await auth().signInWithCredential(googleCredential)
            Alert.alert("Success", JSON.stringify(userInfo))
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('SIGN_IN_CANCELLED');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                console.log('IN_PROGRESS');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                console.log(JSON.stringify(error));
                // some other error happened
            }
        }


    }

    const signIn = async () => {
        // setLogin(true)
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            const isSignedIn = await GoogleSignin.isSignedIn();

            debugger
            if (isSignedIn) {
                const currentUser = await GoogleSignin.getCurrentUser();
            } else {
                debugger
                const { idToken, accessToken } = await GoogleSignin.signIn();
            }
            debugger


            // Create a Google credential with the token





            //console.log('userInfo', userInfo);
            Alert.alert("Success", JSON.stringify(userInfo))
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('SIGN_IN_CANCELLED', error.code)
                // user cancelled the login flow
                console.log('SIGN_IN_CANCELLED');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                Alert.alert("IN_PROGRESS", error.code)
                console.log('IN_PROGRESS');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                Alert.alert('Google Play Services Unavailable')
            } else {
                console.log(JSON.stringify(error));
                Alert.alert("Else", JSON.stringify(error))
                // some other error happened
            }
        }
    };

    return (
        <View style={{ backgroundColor: Color.colorWhite, width: '100%', height: '100%', flex: 1, alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
            <View style={{ marginTop: 50, height: 300, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 45, width: 250, }}
                    source={require('../assets/images/logo.png')}></Image>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <GoogleSigninButton
                    style={{ width: 230, height: 55 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={() => onGoogleButtonPress()}
                // disabled={this.state.isSigninInProgress} 
                />
            </View>
        </View>
    );
}

export default Login;