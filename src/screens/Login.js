import React, { useState, useContext } from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import * as Color from '../res/Color'
import AsyncStorage from '@react-native-community/async-storage'
import AppContext from "../context/AppContext";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
function Login({ navigation }) {
    const { setLogin } = useContext(AppContext);


    const signIn = async () => {
        setLogin(true)
        return
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            alert(userInfo)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('SIGN_IN_CANCELLED');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
                console.log('IN_PROGRESS');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                alert('Google Play Services Unavailable')
            } else {
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
                    onPress={() => signIn()}
                // disabled={this.state.isSigninInProgress} 
                />
            </View>
        </View>
    );
}

export default Login;