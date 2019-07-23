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
  Image

} from 'react-native';

import flatlist from '../components/flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';



export default class DisplayDetails extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    const { navigation } = this.props;
    const { params } = this.props.navigation.state;
    var itemId = navigation.getParam('itemId', 'NO-ID');
    var itemName, itemAuthor;
    var itemImageurl;
    var itemPrice;
    var itemRating;
    var itemSummary;

    for (var i = 0; i < flatlist.length; i++) {
      if (itemId == flatlist[i].id) {
        console.log("PAIR " + i + ": " + flatlist[i].name + flatlist[i].author);
        itemName = flatlist[i].name;
        itemAuthor = flatlist[i].author;
        itemImageurl = flatlist[i].image;
        itemPrice = flatlist[i].price;
        itemRating = flatlist[i].rating;
        itemSummary = flatlist[i].summary;
        console.log("xxx" + itemName + " " + itemAuthor + " " + itemImageurl);
      }
    }


    return (
      <SafeAreaView style={{ flex: 1, alignItems: 'stretch' }}>
        <View style={{ flexDirection: 'row' }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Searchitem_Screen')}>
            <Icon size={30} color="black" name="arrow-back" />
          </TouchableOpacity>
          <Text style={styles.header}>ITEM DETAILS</Text>
        </View>

        <View style={styles.container}>
          <Image
            source={{ uri: itemImageurl }}
            style={{ width: 200, height: 300, marginTop: 60, justifyContent: 'center', alignItems: 'center' }}
          />
          <View style={styles.textt}>
            <Text style={styles.content}>{itemName}</Text>
            <Text style={{ paddingHorizontal: 10 }}>By:{itemAuthor}</Text>
            <Text style={styles.text}>Rs {itemPrice}</Text>
          </View>

          <Text style={{ fontFamily: 'Avenir', fontSize: 20, paddingTop: 20, fontWeight: '500' }}>
            Summary of the Novel
          </Text>
          <Text style={{ fontFamily: 'Avenir', fontSize: 15 }}>{itemSummary}</Text>

          <TouchableOpacity style={styles.button}
            onPress={() => { params.addItem(itemName) 
              alert("Product Added !")
            }}
            >
            <Text>Add To Cart</Text>
          </TouchableOpacity>
        </View>



      </SafeAreaView>

    );



  }

}


const styles = StyleSheet.create({

  header: {
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: "bold",
    color: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 60
  },

  container: {
    backgroundColor: "#B2EBF2",
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    // flex: 1,
  },

  textt: {
    justifyContent: "center",
    alignItems: "center",

  },

  content: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 24
  },

  button: {
    backgroundColor: '#0097A7',
    width: 200,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",


  },


  text: {

    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: '500',
  }
});
