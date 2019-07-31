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
  Image,


} from 'react-native';
import { connect } from 'react-redux'

import flatlist from '../components/flatlist';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconicon from 'react-native-vector-icons/FontAwesome';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import renderIf from './renderIf';
import { TextInput, FlatList } from 'react-native-gesture-handler';




class DisplayDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      review: '',
    }
  }


  static navigationOptions = {
    headerTitle: "",
    headerStyle: {
      backgroundColor: '#006064',
    },
    headerTintColor: '#ffffff',


  }

  handleclick1 = (val1, val2, val3, val4) => {
    this.props.addBook(this.props.currentUser, val1, val2, val3, val4);

  }

  handleClick2 = (val1, val2, val3, val4) => {
    this.props.reduceBook(this.props.currentUser, val1, val2, val3, val4);


  }




  BookQuantity = () => {

    const { navigation } = this.props;
    var itemId = navigation.getParam('itemId', 'NO-ID');

    return this.props.Users[this.props.currentUser].usercart.some((item) => {
      return itemId == item.bookid && item.bookquantity >= 1
    })



  }

  BookQuantity2 = () => {

    const { navigation } = this.props;
    var itemId = navigation.getParam('itemId', 'NO-ID');

    return this.props.Users[this.props.currentUser].usercart.some((item) => {
      return itemId == item.bookid && item.bookquantity == 0
    })

  }


  BookNumber = () => {
    const { navigation } = this.props;
    var itemId = navigation.getParam('itemId', 'NO-ID');

    var num = 0;

    this.props.Users[this.props.currentUser].usercart.forEach((item) => {

      if (itemId == item.bookid) {
        num = item.bookquantity;
      }
    })
    return num;
  }

  renderIf = (condition, content) => {
    if (condition) {
      return content;
    } else {
      return null;
    }
  }

  addReview = (text) => {

    this.setState(
      {
        ...this.state,
        review: text
      }
    );

  }


  render() {


    console.log("current user" + this.props.currentUser);

    const { navigation } = this.props;
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

    renderSeperator = () => {

      return (
        <View style={{
          height: 1,
          width: "100%",
          marginLeft: "14%",
          backgroundColor: 'rgba(0,0,0,0.5)'
        }}
        />
      );

    };

    let reviews = [];

    this.props.Books.forEach(item => {

      if (item.bookid == itemId) {

        item.bookreview.forEach(review => {
          reviews.push({
            userId: review.userId,
            text: review.text,
          })
        });
      }
    }
    );

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


    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={styles.container}>
          <Image
            source={{ uri: itemImageurl }}
            style={{ width: 200, height: 300, marginTop: 60, justifyContent: 'center', alignItems: 'center' }}
          />
          <View style={styles.textt}>
            <Text style={{ fontFamily: 'Avenir', fontSize: 24, fontWeight: "bold", paddingTop: 10, paddingHorizontal: 16, alignSelf: 'center', textAlign: 'center' }}>{itemName}</Text>
            <Text style={{ fontFamily: 'Avenir', fontSize: 15, fontWeight: '500', paddingTop: 10, paddingHorizontal: 16, alignSelf: 'center' }}>By {itemAuthor}</Text>
            <Text style={{ fontFamily: 'Avenir', fontSize: 15, fontWeight: '500', paddingTop: 10, paddingHorizontal: 16, alignSelf: 'center' }}>Rs {itemPrice}</Text>

          </View>


          <View style={{ flexDirection: "row", alignSelf: "center", paddingVertical: 10, paddingHorizontal: 16 }}>

            {this.BookNumber() == 0 &&
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  this.props.addBook(this.props.currentUser, itemId, itemName, itemAuthor, itemPrice)
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#ffffff' }}>BUY NOW</Text>
              </TouchableOpacity>
            }

            <View style={{ padding: 4 }} />

            {this.BookNumber() == 0 &&
              <TouchableOpacity style={styles.button}
                onPress={() => {
                  this.props.addWishlist(this.props.currentUser, itemId, itemName, itemAuthor, itemPrice, itemImageurl)
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#ffffff',textAlign:'center' }}>ADD TO WISHLIST</Text>
              </TouchableOpacity>
            }


            {renderIf(this.BookQuantity(),
              <TouchableOpacity style={{ paddingHorizontal: 10 }}
                onPress={() => {
                  this.handleclick1(itemId, itemName, itemAuthor, itemPrice)
                }}>
                <Icon size={40} color="#006064" name="add-circle-outline" />
              </TouchableOpacity>
            )}


            {renderIf(this.BookQuantity(),
              <Text style={{ fontFamily: 'Avenir', color: '#000000', fontSize: 24, fontWeight: 'bold', color: "#006064" }}>{this.BookNumber()}</Text>
            )}


            {renderIf(this.BookQuantity(),

              <TouchableOpacity style={{ paddingHorizontal: 10 }}
                onPress={() => {
                  this.handleClick2(itemId, itemName, itemAuthor, itemPrice)
                }}>
                <Icons size={40} color="#006064" name="minus-circle-outline" />
              </TouchableOpacity>

            )}
          </View>
          <Text style={{ fontFamily: 'Avenir', fontSize: 20, fontWeight: '500', paddingVertical: 10, paddingHorizontal: 16, alignSelf: 'stretch' }}>Summary of the novel</Text>
          <Text style={{ fontFamily: 'Avenir', fontSize: 15, paddingHorizontal: 16, alignSelf: 'stretch' }}>{itemSummary}</Text>
          <View style={{ flexDirection: 'row', alignSelf: 'stretch' }}>
            <View>
              <View style={{ flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Avenir', fontSize: 20, fontWeight: '500', paddingTop: 10, paddingHorizontal: 16, alignSelf: 'stretch' }}>Reviews and Ratings</Text>
                <Icon size={18} color='#fbc02d' name="star" />
                <Icon size={18} color='#fbc02d' name="star" />
                <Icon size={18} color='#fbc02d' name="star" />
              </View>
              {reviews.length == 0 &&
                <Text style={{ fontFamily: 'Avenir', fontSize: 14, paddingTop: 10, paddingHorizontal: 16, alignSelf: 'stretch' }}>Be the first to Review this book: {itemName}</Text>
              }
            </View>
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={{ flex: 1, marginHorizontal: 16, fontsize: 20 }}
              placeholder="Add a review"
              onChangeText={this.addReview}
              value={this.state.review}
            />
            <TouchableOpacity onPress={() => { this.props.addBookReview(this.props.currentUser, itemId, this.state.review) }}>
              <Text style={{ color: '#000000', fontWeight: '400', fontSize: 15, paddingHorizontal: 10 }}>Post</Text>
            </TouchableOpacity>

          </View>

          {reviews.map((item) => <>
            <View style={{ flexDirection: 'row', paddingHorizontal: 16, paddingTop: 16, alignSelf: 'stretch' }}>
              <Iconicon size={32} color="#006064" name="user-circle-o" />
              <View style={{ padding: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={{ textAlign: "justify", fontWeight: "bold", fontFamily: 'Avenir', fontSize: 15 }}>
                  User: {this.props.Users[item.userId].username}
                </Text>
                <View style={{ padding: 2 }} />
                <Text style={{ textAlign: "justify" }}>{item.text}</Text>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#ccc', marginHorizontal: 50 }} />
          </>)}
        </View>

        <View style={{ padding: 20 }} />

        <Text style={{ fontFamily: 'Avenir', fontSize: 20, fontWeight: '500', paddingVertical: 10, paddingHorizontal: 16, alignSelf: 'stretch' }}>Books you might like to buy</Text>
        <View style={styles.horizontalSB}>

          <FlatList
            horizontal
            data={this.props.Users[this.props.currentUser].wishlist}
            ItemSeparatorComponent={this.renderSeperator}
            renderItem={({ item }) => (
              <View style={{ paddingTop: 12 ,paddingBottom:12,paddingHorizontal:6}}>
                <View style={{ alignItems: 'center', height: 210, width: 180, alignSelf: 'stretch', borderWidth:0.5 }}>
                  <Image source={{ uri: item.bookimage }} style={styles.ImageStyle} />
                  <View style={{ padding: 2 }} />
                  <Text>{item.bookname}</Text>
                  <View style={{ padding: 2 }} />
                  <Text>By: {item.bookauthor}</Text>
                  <View style={{ padding: 2 }} />
                  <Text>Rs: {item.bookprice} only</Text>
                  <View style={{ padding: 2 }} />
                </View>
              </View>
            )}
          />

        </View>


      </ScrollView>);



  }

}

const mapStateToProps = (state) => ({
  Users: state.Users,
  currentUser: state.currentUser,
  Books: state.Books,

});

const mapDispatchToProps = (dispatch) => {
  return {
    addBook: (userId, val1, val2, val3, val4) => dispatch({ type: 'ADD_BOOK', payload: { userId: userId, bookid: val1, bookname: val2, bookauthor: val3, bookprice: val4 } }),
    reduceBook: (userId, val1, val2, val3, val4) => dispatch({ type: 'REDUCE_BOOK', payload: { userId: userId, bookid: val1, bookname: val2, bookauthor: val3, bookprice: val4 } }),
    addBookReview: (userId, val1, review) => dispatch({ type: 'ADD_BOOK_REVIEW', payload: { userId: userId, bookid: val1, review: review } }),
    addWishlist: (userId, val1, val2, val3, val4, val5) => dispatch({ type: 'ADD_WISHLIST', payload: { userId: userId, bookid: val1, bookname: val2, bookauthor: val3, bookprice: val4, bookimage: val5 } }),
  };

};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayDetails);


const styles = StyleSheet.create({


  header: {
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: "bold",
    color: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 60
  },


  row: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    width: 350,

  },
  container: {
    backgroundColor: "#ffffff",
    alignItems: 'center',
    flex: 1,
  },

  textt: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    fontFamily: 'Avenir'

  },

  content: {
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: 'Avenir',
  },

  button: {
    backgroundColor: '#0097A7',
    width: 150,
    borderRadius: 5,
    height: 60,
    color: '#ffffff',
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,


  },

  horizontalSB: {
    flex: 1,
    flexDirection: 'row',
    //borderTopWidth: 0.5,
    //borderBottomWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.5)',
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },


  text: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: '500',
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: .5,
    //borderColor: 'black',
    height: 50,
    width: 350,
    borderRadius: 5,
    marginTop: 10,
    fontSize: 20,

  },

  ImageStyle: {
    height: 140,
    width: 110,
    resizeMode: 'stretch',
    borderRadius: 5,


  },


});
