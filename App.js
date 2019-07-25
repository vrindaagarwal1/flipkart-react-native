/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

} from 'react-native';
import { AsyncStorage } from 'react-native';

import Main from './Main'
import { Provider } from 'react-redux'
import store from './store/storeItems'



class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;



