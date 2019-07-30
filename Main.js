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

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Searchitems from './src/pages/Searchitems';
import DisplayDetails from './src/pages/DisplayDetails';
import Cart from './src/pages/Cart';
import StoreItems from './store/storeItems';
import Wishlist from './src/pages/Wishlist';


/*selectInitialRoute=()=>{

  if()
  return 'Searchitem_Screen'
  else
  return 'Login_Screen'

}*/


const StackNavigator = createStackNavigator(
  {

    Login_Screen: Login,
    Signup_Screen: Signup,
    Searchitem_Screen: Searchitems,
    DisplayDetails_Screen: DisplayDetails,
    Cart_Screen: Cart,
    Wishlist_Screen: Wishlist,
  },
  {
    initialRouteName: "Login_Screen"
    //initialRouteName:this.selectInitialRoute(),
  }


);


const Main = createAppContainer(StackNavigator);

export default Main;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0097A7'

  },


});