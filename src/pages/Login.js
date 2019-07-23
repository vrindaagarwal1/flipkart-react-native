
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  AsyncStorage

} from 'react-native';
import Logo from '../components/Logo';
import Form from '../components/Form';
import { tsConstructorType } from '@babel/types';

export default class Login extends Component {

  contructor() {
    this.state = {
      username: '',
      password: ''
    }
    this.users = [];
  }

  ValidateUser = () => {


    return this.users.some((item) => {
      return this.state.username == item.username && this.state.password == item.password;
    })

  }

  getUsersFromStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.toString()) {

        const existing_users = await AsyncStorage.getItem('Users')
        let newlist = JSON.parse(existing_users);
        this.users = newlist;
      }
      if (this.ValidateUser()) {
        console.log("in validtion...." + this.state.username + " " + this.state.password);

        this.props.navigation.navigate('Searchitem_Screen', {
          loggedin_username: this.state.username,
          loggedin_password: this.state.password,

        });
      }
      else {
        alert("Username Password Pair Invalid")
      }
    } catch (error) {
      console.log('get users error', error.message);
    }
  }


  static navigationOptions = {
    header: null
  }

  getDetails = (val1, val2) => {



    this.setState({
      username: val1,
      password: val2,
    }, () => {

      this.getUsersFromStorage();
    });

  }


  render() {

    return (
      <View style={styles.container}>
        <Logo type="Welcome To Flipkart" />
        <Text style={{ fontFamily: 'Avenir', fontSize: 20 }}>Login</Text>
        <Form type="Login"
          sendData={this.getDetails}
        />
        <View style={styles.lines}>
          <Text style={styles.text1}>Don't have an account with Us?</Text>
          <TouchableOpacity style={styles.text2}
            onPress={() => this.props.navigation.navigate('Signup_Screen')}>
            <Text style={styles.buttontext} on>Signup!</Text>
          </TouchableOpacity>
        </View>

      </View>
    );

  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0097A7',
    fontFamily: 'Avenir'

  },

  lines: {
    flexGrow: 1,
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: 'flex-end',
    marginVertical: 16,
    fontFamily: 'Avenir',

  },

  text1: {
    fontSize: 16,
    fontFamily: 'Avenir'

  },

  text2: {
    paddingHorizontal: 10,
    fontFamily: 'Avenir'
  },

  buttontext: {

    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
    textAlign: 'center',
    fontFamily: 'Avenir'


  },



});
