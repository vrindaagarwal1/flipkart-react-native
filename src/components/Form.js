import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Button

} from 'react-native';
//import { tsConstructorType } from '@babel/types';
import Login from '../pages/Login';
import { connect } from 'react-redux'
//import console = require('console');

class Form extends Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }

  }

  update1=(text) => {
     
    this.setState(
      {
       ...this.state,
        username : text
      }
    );
   
  }

  update2 =(text)=> {
   
    this.setState(
      {
       ...this.state, 
       password: text
      }
    );

  }  


  buttonClick = () => {
    console.log("button clicked..." + this.state.username);
    console.log(this.props.type);

    if (this.props.type == 'Login') {
      console.log("in login");
      this.props.sendData(this.state.username, this.state.password);
    }
    if (this.props.type == 'SignUp') {
      console.log("adding user");
      
      this.props.addUser(this.state.username,this.state.password);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.textinput}
          onChangeText={this.update1}
          value={this.state.username}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Email"
          selectionColor="#ffffff"
          textContentType='username'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCompleteType='email'
        />

        <TextInput style={styles.textinput}
          underlineColorAndroid='rgba(0,0,0,0)'
          placeholder="Password"
          textContentType='password'
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={this.update2}
          value={this.state.password}
        />
        <TouchableOpacity style={styles.button} onPress={this.buttonClick}>
          <Text style={styles.buttontext}>{this.props.type}</Text>
        </TouchableOpacity>

      </View>
    );
  }
}



const mapDispatchToProps = (dispatch) => {

  return {
    addUser: (val1,val2) => dispatch({ type: 'ADD_USER', payload:{ username: val1, password: val2 } })
    //validateUser: () => dispatch({ type: VALIDATE_USER, payload: { username: this.state.username, password: this.state.password }})
  };

};

export default connect(null, mapDispatchToProps)(Form);


const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: "center",
    fontFamily: 'Avenir'

  },

  textinput: {
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#80DEEA',
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#000000",
    marginVertical: 10,
    fontFamily: 'Avenir'

  },

  button: {
    backgroundColor: '#006064',
    width: 300,
    height: 50,
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: 'Avenir'

  },

  buttontext: {

    fontSize: 16,
    color: "#ffffff",
    fontWeight: '500',
    textAlign: 'center',
    fontFamily: 'Avenir'


  },


});