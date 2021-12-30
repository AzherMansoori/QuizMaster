import React, { useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import * as Color from '../res/Color'
import * as Strings from '../res/Strings'
import * as Fonts from '../res/Fonts'


const Header = ({ navigation, showBack=true }) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity onPress={() => showBack ? navigation.goBack() : null} style={styles.leftContainer}>
                {showBack ? <Image style={{ height: 20, width: 20, }}
                    source={require('../assets/images/back.png')}></Image>
                    : null}
            </TouchableOpacity>
            <View style={styles.centerContainer}>
                <Text style={{ color: Color.textColor, fontSize: 20, fontFamily: Fonts.PoppinsBold }}
                >{Strings.appName}</Text>
            </View>
            <View style={styles.rightContainer}>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        backgroundColor: Color.colorPrimary,
        justifyContent: 'space-between', alignItems: 'center'
    },
    leftContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Header;