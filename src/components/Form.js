import React, {Component} from 'react';
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

export default class Form extends Component{

  constructor(props){
    super(props);
    this.state={

      details_username:'',
      details_password:'',
    }
  }

  update1=(text) => {
     
    this.setState(
      {
       ...this.state,
        details_username : text
      }
    );
   
  }

  update2 =(text)=> {
   
    this.setState(
      {
       ...this.state, 
       details_password: text
      }
    );

  }  

  buttonClick=() =>{
    if(this.state.details_username=='' || this.state.details_password=='')
    alert('Complete all the fields');
    else
    this.props.sendData(this.state.details_username,this.state.details_password);

  }
    render(){
        return(
            <View style={styles.container}>
               <TextInput style={styles.textinput}
                 onChangeText={this.update1}
                 value={this.state.details_username}
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Email"
                  selectionColor="#ffffff"
                  textContentType='username'
                  keyboardType='email-address' 
                  autoCapitalize='none'
                  autoCompleteType='email'
                 // onSubmitEditing={() => this.password.focus()}
                  
               />

              <TextInput style={styles.textinput}
                 
                  underlineColorAndroid='rgba(0,0,0,0)'
                  placeholder="Password"
                  textContentType='password'
                  autoCapitalize='none'
                  secureTextEntry={true}
                  onChangeText={this.update2}
                  value={this.state.details_password}
                 // ref={ (c) => this.password = c}
                 
               />
              <TouchableOpacity style={styles.button} onPress={this.buttonClick}>
                <Text style={styles.buttontext}>{this.props.type}</Text>
              </TouchableOpacity>
               
            </View>
        );
    }
}

const styles = StyleSheet.create({
  
    container : {
      flexGrow:1,
      flexDirection:"column",
      justifyContent:'center',
      alignItems:"center",
      fontFamily:'Avenir'
    
    },

    textinput: {
      width:300,
      height:50,
     alignItems:"center",
     justifyContent:"center",
     backgroundColor:'#80DEEA',
     borderRadius:25,
     paddingHorizontal:10,
     fontSize:16,
     color:"#000000",
     marginVertical:10,
     fontFamily:'Avenir'

    },

    button:{
      backgroundColor:'#006064',
      width:300,
      height:50,
      marginVertical:10,
      paddingVertical:15, 
      borderRadius:25,
      alignItems:"center",
      justifyContent:"center",
      fontFamily:'Avenir'

    },
     
    buttontext:{

      fontSize:16,
      color:"#ffffff",
      fontWeight:'500',
      textAlign:'center',
      fontFamily:'Avenir'
      

    },
  
  
  });