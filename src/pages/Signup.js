
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
import Icon from 'react-native-vector-icons/Ionicons';
import { thisExpression } from '@babel/types';




export default class SignUp extends Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      usercart: [
        {
          productname: '',
          productquantity:'',

        }
      ],
    }

    this.users = [];
  }

  getUsersFromStorage = async () => {

    console.log("in getusers");
    try {

      const keys = await AsyncStorage.getAllKeys();

      if (keys.toString()) {
        const existing_users = await AsyncStorage.getItem('Users')
        let newlist = JSON.parse(existing_users);
        this.users = newlist;
      }
      this.registerUser();

    } catch (error) {
      console.log('get users error', error.message);
    }
  }


  registerUser = async () => {

    console.log("in register usersss");
    try {

      this.users.push(
        {
          username: this.state.username,
          password: this.state.password,
          usercart: [...this.state.usercart],
        }
      )

      await AsyncStorage.setItem('Users', JSON.stringify(this.users));
      alert('SignUp Success ..Now you can login');
      this.props.navigation.goBack();
      console.log("user stored");

    } catch (error) {
      console.log('register user error', error.message);
    }

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
        <Icon></Icon>
        <Logo type="Register To Continue" />
        <Form type="SignUp"
          sendData={this.getDetails}
        />

        <View style={styles.lines}>
          <Text style={styles.text1}>Already have an account with Us?</Text>
          <TouchableOpacity style={styles.text2}
            onPress={() => this.props.navigation.navigate('Login_Screen')}>
            <Text style={styles.buttontext}>Login!</Text>
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
    backgroundColor: '#0097A7'

  },

  lines: {
    flexGrow: 1,
    flexDirection: 'row',
    alignContent: "center",
    justifyContent: 'flex-end',
    marginVertical: 16,

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
