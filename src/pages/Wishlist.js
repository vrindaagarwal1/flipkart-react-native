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

//import console = require('console');

class Wishlist extends Component {

    static navigationOptions = {
        headerTitle: "MY WISHLIST",
        headerStyle: {
            backgroundColor: '#006064',
        },
        headerTintColor: '#ffffff'

    }

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.Users[this.props.currentUser].wishlist,
        }

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

        console.log("users " + this.props.Users);
        console.log("current" + this.props.currentUser)

        this.props.Users[this.props.currentUser].wishlist.forEach((item)=>{
            console.log(item.bookid + " " + item.bookname + " " + item.bookprice);
        })
        

        return (<View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1 }}
                ListHeaderComponent={this.renderHeader}
                data={this.state.data}
                ItemSeparatorComponent={this.renderSeperator}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                    
                        <View style={{ flex: 1, justifyContent: 'center' ,alignSelf:'stretch'}}>
                            <Text style={styles.enteries}>Product Name: {item.bookname}</Text>
                            <Text style={styles.enteries2}>Author: {item.bookauthor}</Text>
                            <Text style={styles.enteries2}>Price: {item.bookprice}</Text>
                            
                            
                        </View>
                        

                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>);
    }

}


const mapStateToProps = (state) => ({
    Users: state.Users,
    currentUser: state.currentUser,
});

export default connect(mapStateToProps, null)(Wishlist);


const styles = StyleSheet.create({

    row: {
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },


});
