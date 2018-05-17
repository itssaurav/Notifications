/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackHandler,
    WebView,
    ToastAndroid,
    FlatList,
    Image,
    TouchableOpacity

} from 'react-native';


class AppModal extends Component<Props> {
    constructor(props)
    {
        super(props);
        this.state={
            goBack:false
        }
    }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
               <Text>This is LightBox</Text>
            </View>

        );
    }
}



export default AppModal;


