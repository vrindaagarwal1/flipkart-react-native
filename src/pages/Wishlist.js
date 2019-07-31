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
    FlatList,
    Dimensions,

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

        const entireScreenWidth = Dimensions.get('window').width;
        const p = parseInt(6);
        const w = parseInt((entireScreenWidth - (p * 4)) / 2);
        console.log("wow  " + entireScreenWidth);

        console.log("users " + this.props.Users);
        console.log("current" + this.props.currentUser)

        this.props.Users[this.props.currentUser].wishlist.forEach((item) => {
            console.log(item.bookid + " " + item.bookname + " " + item.bookprice);
        })


        return (<View style={{ flex: 1 }}>
            <FlatList
                style={{ flex: 1, flexDirection: 'column',marginBottom:20}}
                data={this.state.data}
                ItemSeparatorComponent={this.renderSeperator}
                renderItem={({ item }) => (
                    <View style={{
                        paddingTop: p, paddingHorizontal: p
                    }}>
                        <View style={{ alignItems: 'center', height: 230, width: w, alignSelf: 'stretch', borderWidth: 0.2 }}>
                            <View style={{ padding: 1 }} />
                            <Image source={{ uri: item.bookimage }} style={styles.ImageStyle} />
                            <View style={{ padding: 2 }} />
                            <Text>{item.bookname}</Text>
                            <View style={{ padding: 2 }} />
                            <Text>By: {item.bookauthor}</Text>
                            <View style={{ padding: 2 }} />
                            <Text>Rs: {item.bookprice} only</Text>
                            <View style={{ padding: 1 }} />
                        </View>
                    </View>
                )}
                numColumns={2}
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
        //flexDirection: "row",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "black",
    },

    ImageStyle: {
        height: 140,
        width: 110,
        borderRadius: 5,
        resizeMode: 'contain',

    },

});
