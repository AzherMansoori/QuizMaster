import React from 'react';
import {
    Alert
} from 'react-native';

export function showMessage(isError = false, message) {
    Alert.alert(
        isError ? 'Alert' : 'Success',
        message,
        [
            { text: 'Ok', style: 'cancel' },
        ],
        { cancelable: false },
    );
}
