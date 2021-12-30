import React, { useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    Alert
} from 'react-native';
import * as Color from '../res/Color'
import * as Strings from '../res/Strings'
import * as Fonts from '../res/Fonts'


const EmptyView = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', fontSize: 18, fontFamily: Fonts.PoppinsSemiBold, color: Color.textColor }}>{Strings.noDataFound}</Text>
        </View>
    )
}
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
export default EmptyView;