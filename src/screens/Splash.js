import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet
} from 'react-native';


const Splash = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={{ height: 50, width: 300, }}
        source={require('../assets/images/logo.png')}></Image>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center', alignItems: 'center'
  }
})
export default Splash;