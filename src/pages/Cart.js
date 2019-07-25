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
    AsyncStorage,
    FlatList

} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import flatlist from '../components/flatlist';
import { connect } from 'react-redux'
import CartIcon from './CartIcon';
//import console = require('console');

class Cart extends Component {

    static navigationOptions = {
        headerTitle: "MY CART",
        headerRight: (
            <CartIcon />
        )
        
    }

    constructor(props) {
        super(props);
        this.state = {

            mycart: this.props.Users[this.props.currentUser].usercart,
            totalValue:0,
        }

    }

    calculateTotal=()=>{
        
        var total = 0;
        this.state.mycart.forEach((item) => {
            let price = parseInt(item.bookprice, 10);
            let quan=parseInt(item.bookquantity,10)
            total = total + (price * quan);
        })
        this.setState(
            {
                totalValue: total,
            }
        )


    }

    componentDidMount=()=>{

        this.calculateTotal();

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


    render() {

        console.log("in usercart" + this.props.currentUser);
        this.state.mycart.forEach((item) => {

            console.log(item.bookid + " " + item.bookname)

        });


        return (<View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={this.renderHeader}
                data={this.state.mycart}
                ItemSeparatorComponent={this.renderSeperator}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={styles.enteries}>Product Name:{item.bookname}</Text>
                            <Text style={styles.enteries2}>Author:{item.bookauthor}</Text>
                            <Text style={styles.enteries2}>Price:{item.bookprice}</Text>
                            <Text style={styles.enteries2}>Quantity:{item.bookquantity}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.bottom}>TOTAL VALUE : Rs {this.state.totalValue}</Text>
        </View>);
    }

}

const mapStateToProps = (state) => ({
    Users: state.Users,
    currentUser: state.currentUser,

});

export default connect(mapStateToProps, null)(Cart);


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
      fontSize: 15,
      fontFamily: 'Avenir',
      paddingHorizontal: 20,
      paddingVertical: 4,
  
    },
  
    bottom:{
        marginBottom:30,
        fontSize:20,
        fontFamily: 'Avenir',
        marginHorizontal:20,
    }
  
  
  });
