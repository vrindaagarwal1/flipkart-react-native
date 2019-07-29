
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
import { connect } from 'react-redux';
//import console = require('console');

class Login extends Component {

  static navigationOptions = {
    header: null
  }
  
  ValidateUser = (val1, val2) => {

    console.log("in validate user")

    return this.props.Users.some((item) => {
      return val1 == item.username && val2 == item.password;
    })

  }

  getDetails = (val1, val2) => {

    console.log("in get details" + val1 + val2);

      if (this.ValidateUser(val1, val2)) {
        console.log("in validtion...." + val1 + " " + val2);
        this.props.navigation.navigate('Searchitem_Screen', {
          loggedin_username: val1,
          loggedin_password: val2,

        });

      }
      else {
        alert("invalid user")
      }

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


const mapStateToProps = (state) => ({
  Users: state.Users,

});

export default connect(mapStateToProps, null)(Login);

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#0097A7',
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
    color: "#000000",
    fontWeight: "bold",
    textAlign: 'center',
    fontFamily: 'Avenir'


  },



});
