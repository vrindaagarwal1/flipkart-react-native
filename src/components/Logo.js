import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Logo extends Component{
    render(){
        return(
            <View style={styles.container}>
               <Icon size={70} color="black" name="shopping-cart" />
               <Text style={styles.logotxt}>{this.props.type}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  
    container : {
      flexGrow:1,
      justifyContent:'flex-end',
      alignItems:"center",
      
    
    },

    logotxt :{
      
        fontFamily: Platform.OS == 'android' ? 'sans-serif' : 'Helvetica',
        fontSize:30,
        marginVertical:10,
        fontFamily:'Avenir'

    },
  
  
  });