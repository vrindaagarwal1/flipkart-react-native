
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


  render() {

    return (
      <View style={styles.container}>
        <Icon></Icon>
        <Logo type="Register To Continue" />
        <Form type="SignUp" />
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
