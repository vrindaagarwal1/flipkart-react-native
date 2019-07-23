import React, { Component } from 'react';
import { AsyncStorage, TouchableOpacity, Animated, Platform, Dimensions, Easing, Keyboard, AppRegistry, View, StyleSheet, Text, SafeAreaView, ScrollView, TextInput, ActivityIndicator, FlatList, Image } from 'react-native';

import flatlist from '../components/flatlist';
import SignUp from './Signup';
import Icon from 'react-native-vector-icons/AntDesign';
//import console = require('console');



export default class Searchitems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: flatlist,
      query: "",
      filtered: flatlist,
      searchBarFocused: false,
      animtedValue: new Animated.Value(Dimensions.get('window').width),
      username: "",
      password: "",
      userindex: "",
      cart: [],
    }
    this.users = [];



    setTimeout(() => {
      Animated.timing(
        this.state.animtedValue, {
          toValue: 0,
          easing: Easing.inOut(Easing.ease),
        }
      ).start();
    }, 100);
  }

  handleAddToCart = async (listId) => {

    console.log(listId);


    this.setState({
      cart: [...this.state.cart, listId]
    })

    console.log("incresedd" + this.state.cart.length);
    this.UserCartUpdate();

  }

  UserCartUpdate = async () => {

    console.log("new user carttttttt");
    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.toString()) {

        const existing_users = await AsyncStorage.getItem('Users');
        let newlist = JSON.parse(existing_users);
        //newlist[this.state.userindex].usercart = [...newlist[this.state.userindex].usercart,this.state.cart];
        newlist[this.state.userindex].usercart = [...this.state.cart];
        console.log(this.state.cart.length);
        console.log(newlist[this.state.userindex].usercart.length);

        AsyncStorage.setItem("Users", JSON.stringify(newlist));

      }
      
      

    } catch (error) {
      console.log('get users error', error.message);
    }

  }



  getUsersFromStorage = async () => {

    const { navigation } = this.props;
    var loggedin_username = navigation.getParam('loggedin_username', 'NO-ID');
    var loggedin_password = navigation.getParam('loggedin_password', 'NO-ID');

    this.setState(
      {
        username: loggedin_username,
        password: loggedin_password,
      }
    )

    console.log("hiiii " + loggedin_username);
    console.log("hiiii " + loggedin_password);

    try {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.toString()) {

        const existing_users = await AsyncStorage.getItem('Users');
        let newlist = JSON.parse(existing_users);


        newlist.forEach((item, index) => {
          //console.log(item.username + " " + item.password);
          if (item.username == loggedin_username && item.password == loggedin_password) {
            console.log("found index " + index);

            this.setState({
              cart: [...item.usercart],
              userindex: index,
            });

          }
        })
      }
    } catch (error) {
      console.log('get users error', error.message);
    }
  }

  componentDidMount() {


    console.log("in componentdidmount");
    this.getUsersFromStorage();

    this.KeyboardDidShow = Keyboard.addListener('keyboardDidShow', this.KeyboardDidShow)
    this.KeyboardWillShow = Keyboard.addListener('keyboardWillShow', this.KeyboardWillShow)
    this.KeyboardWillHide = Keyboard.addListener('keyboardWillHide', this.KeyboardWillHide)

  }

  KeyboardDidShow = () => {
    this.setState({ searchBarFocused: true })
    //alert('Keyboard Visible')
  }

  KeyboardWillShow = () => {
    this.setState({ searchBarFocused: true })
  }

  KeyboardWillHide = () => {
    this.setState({ searchBarFocused: false })
  }

  renderSeperator = () => {

    return (
      <View style={{
        height: 1,
        width: "100%",
        marginLeft: "14%"
      }}
      />
    );

  };

  SearchFilterFunction = (text) => {
    const newData = this.state.data.filter(function (item) {
      const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      filtered: newData,
      query: text,
    });
  }

  static navigationOptions = {
    header: null
  }




  render() {

    console.log("userindex is " + this.state.userindex);



    const { navigation } = this.props;
    var loggedin_username = navigation.getParam('loggedin_username', 'NO-ID');
    var loggedin_password = navigation.getParam('loggedin_password', 'NO-ID');


    return (<View style={{ flex: 1 }}>

      <View style={{ height: 140, backgroundColor: '#006064', justifyContent: 'flex-end', paddingHorizontal: 5, paddingBottom: 10 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ paddingHorizontal: 20 }}
            onPress={() => {
              this.props.navigation.navigate('Cart_Screen', {
                loggedin_username: loggedin_username,
                loggedin_password: loggedin_password,
                userindex: this.state.userindex,
              })
            }}>
            <Icon size={30} color="white" name="shoppingcart" />
            
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login_Screen')} >
            <Icon size={30} color="white" name="logout" />
          </TouchableOpacity>
        </View>

        <Animated.View

          style={[styles.SectionStyle, {
            transform: [{ translateX: this.state.animtedValue }]
          }]}>
          < TextInput
            style={{ flex: 1, marginHorizontal: 16 }}
            placeholder="Search Here"
            onChangeText={text => this.SearchFilterFunction(text)}
            value={this.state.query}
          />
        </Animated.View>
      </View>


      <FlatList 
        style={{ flex: 1, backgroundColor: '#B2EBF2' }}
        ListHeaderComponent={this.renderHeader}
        data={this.state.filtered}
        ItemSeparatorComponent={this.renderSeperator}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}
            onPress={() => {
              this.props.navigation.navigate('DisplayDetails_Screen', {
                itemId: item.id,
                addItem: this.handleAddToCart,

              });


            }}>
            <Image source={{ uri: item.image }} style={styles.ImageStyle} />
            <View style={{ flex: 1, justifyContent: 'center' }}>
              < Text style={styles.enteries}>{item.name}</Text>
              <Text style={styles.enteries2}>{item.author}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>);
  }


}

const styles = StyleSheet.create({


  row: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  enteries: {
    fontSize: 20,
    fontFamily: 'Avenir',
    paddingHorizontal: 20,
    paddingVertical: 4,
    fontWeight: '500'

  },

  enteries2: {
    fontSize: 12,
    fontFamily: 'Avenir',
    paddingHorizontal: 20,
    paddingVertical: 4,

  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: .5,
    borderColor: 'black',
    height: 50,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 20,

  },

  ImageStyle: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignItems: "center",
    borderRadius: 5,
  },



});