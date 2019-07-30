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
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import flatlist from '../components/flatlist';
import { connect } from 'react-redux'
import CartIcon from './CartIcon';

//import console = require('console');

class Cart extends Component {

    static navigationOptions = {
        headerTitle: "MY CART",
        headerStyle: {
            backgroundColor: '#006064',
        },
        headerTintColor: '#ffffff',
        headerRight: (
            <CartIcon />
        )

    }

    constructor(props) {
        super(props);
        this.state = {

            mycart: this.props.Users[this.props.currentUser].usercart,
            totalValue: 0,
            flag: 0,
        }



    }



    calculateTotal = () => {

        var total = 0;
        this.state.mycart.forEach((item) => {
            let price = parseInt(item.bookprice, 10);
            let quan = parseInt(item.bookquantity, 10)
            total = total + (price * quan);
        })
        this.setState({
            totalValue: total,

        })


    }

    handleclick1 = (val1, val2, val3, val4) => {
        this.props.addBook(this.props.currentUser, val1, val2, val3, val4);
        this.calculateTotal();
    }

    handleClick2 = (val1, val2, val3, val4) => {
        this.props.reduceBook(this.props.currentUser, val1, val2, val3, val4);
        this.calculateTotal();

    }

    componentDidMount = () => {

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
                    <View style={styles.row}>
                    
                        <View style={{ flex: 1, justifyContent: 'center' ,alignSelf:'stretch'}}>
                            <Text style={styles.enteries}>Product Name: {item.bookname}</Text>
                            <Text style={styles.enteries2}>Author: {item.bookauthor}</Text>
                            <Text style={styles.enteries2}>Price: {item.bookprice}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.enteries2}>Quantity: {item.bookquantity}</Text>
                                <TouchableOpacity style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        this.handleclick1(item.bookid, item.bookname, item.bookauthor, item.bookprice)
                                    }}>
                                    <Icon size={25} color="red" name="add-circle-outline" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingHorizontal: 10 }}
                                    onPress={() => {
                                        this.handleClick2(item.bookid, item.bookname, item.bookauthor, item.bookprice)
                                    }}>
                                    <Icons size={25} color="red" name="minus-circle-outline" />
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                        

                    </View>
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

const mapDispatchToProps = (dispatch) => {
    return {
        addBook: (userId, val1, val2, val3, val4) => dispatch({ type: 'ADD_BOOK', payload: { userId: userId, bookid: val1, bookname: val2, bookauthor: val3, bookprice: val4 } }),
        reduceBook: (userId, val1, val2, val3, val4) => dispatch({ type: 'REDUCE_BOOK', payload: { userId: userId, bookid: val1, bookname: val2, bookauthor: val3, bookprice: val4 } })
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);


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

    bottom: {
        
        borderColor:'#000000',
        borderRadius:5,
        backgroundColor:'#e0f7fa',
        height:40,
        marginBottom: 30,
        fontSize: 20,
        fontFamily: 'Avenir',
        marginHorizontal: 20,
        marginTop:20,
        alignSelf:'stretch',
        textAlign:'center',
        paddingTop:5
        
        
    }


});
