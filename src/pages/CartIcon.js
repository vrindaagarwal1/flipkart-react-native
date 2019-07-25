import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux'

class CartIcon extends Component {

    constructor(props){
        super(props)
        this.state = {
            mycart: this.props.Users[this.props.currentUser].usercart.length

        }
    }

    render() {

        return (
            <View style={{ padding: 5 }}>
                <View style={{ position: 'absolute', height: 30, width: 30, borderRadius: 15, backgroundColor: 'rgba(95,197,123,0.8)', right: 15, bottom: 15, alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>{this.state.mycart}</Text>
                </View>
                <Icon size={30} name="shoppingcart"/>
            </View>
        );
    }
}

const mapStateToProps = (state) => ({
    Users: state.Users,
    currentUser:state.currentUser,
})

export default connect(mapStateToProps,null)(CartIcon);