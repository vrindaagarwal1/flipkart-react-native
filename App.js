/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,

} from 'react-native';
import {AsyncStorage} from 'react-native';

import {createStackNavigator,createAppContainer} from 'react-navigation';

import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Searchitems from './src/pages/Searchitems';
import DisplayDetails from './src/pages/DisplayDetails';
import Cart from './src/pages/Cart';


const StackNavigator=createStackNavigator(
  {

  Login_Screen : Login,
  Signup_Screen: Signup,
  Searchitem_Screen:Searchitems,
  DisplayDetails_Screen:DisplayDetails,
  Cart_Screen :Cart,
  },
  {
  initialRouteName: "Login_Screen"
  }


);


const App=createAppContainer(StackNavigator);


export default App;
 
const styles = StyleSheet.create({
  
  container : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#0097A7'
  
  },


});


