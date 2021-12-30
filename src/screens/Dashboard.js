import React, { useState, useContext, useEffect } from 'react';
import {
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    Image,
    FlatList
} from 'react-native';
import * as Color from '../res/Color'
import AppContext from "../context/AppContext";
import Header from "../components/Header";
import EmptyView from "../components/EmptyView";
import { useDispatch, useSelector } from "react-redux";
import { GET_CATEGORY_REQUEST } from "../store/constants";
import * as Fonts from '../res/Fonts'

function Dashboard({ navigation }) {
    const dispatch = useDispatch();
    const { catList, loading } = useSelector(state => state.entities.category);
    const [mobile, setMobile] = useState('');
    console.log('catList', catList);
    useEffect(() => {
        dispatch({ type: GET_CATEGORY_REQUEST })
    }, [])

    const catItem = (item) => {
        return (
            <View style={{
                backgroundColor: Color.colorWhite, width: '48%', marginBottom: 10, marginLeft: 5, marginRight: 5,
                height: 180, borderRadius: 5, elevation: 5,  alignItems:'center'
            }}>
                <Image style={{ height: 100, width: '90%', }}
                    //resizeMode={''}
                    source={require('../assets/images/dummy_category.png')}></Image>
                <Text style={{ textAlign: 'center', fontSize: 16, fontFamily: Fonts.PoppinsSemiBold, color: Color.textColor, marginTop:10 }}>Category</Text>
                <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: Fonts.PoppinsLight, color: Color.textColor, marginTop:5 }}>Sub Category</Text>

            </View>
        )

    }
    return (
        <View style={{ backgroundColor: Color.colorLightGray, width: '100%', height: '100%', flex: 1, alignItems: 'center', }}>
            <Header navigation={navigation} showBack={false}></Header>
            <View style={{ width: '100%', flex: 1, padding: 5,marginTop:10 }}>
                {catList && catList.data.length > 0 ?
                    <FlatList
                        numColumns={2}
                        data={catList.data}
                        keyExtractor={(item) => item.id}
                        renderItem={(item, index) => catItem(item)}
                        removeClippedSubviews={false}
                    ></FlatList>
                    :
                    <EmptyView />
                }

            </View>
        </View>
    );
}

export default Dashboard;