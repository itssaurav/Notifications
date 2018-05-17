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
  View
} from 'react-native';
import {Router,Stack,Scene,Actions,Modal,Lightbox} from 'react-native-router-flux'
import AppModal from './src/components/modal'
import Home from "./src/components/home";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {

    return (
        <Router>

            <Scene key="root">
                <Scene key='drawer' drawer={true} open={false} hideDrawerButton={false} drawerPosition='right' hideNavBar>
                    <Scene key="home" component={Home}  title="Match Fixtures"/>
                </Scene>
                <Scene key="modal" component={AppModal}  title="Modal" modal hideNavBar/>

             </Scene>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
