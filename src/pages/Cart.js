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

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originaldata: flatlist,
            userindex: '',
            datatodisplay: [],
            totalValue: 0,
            flag: 0,
        }
        this.userBooks = [

        ];
    }

    componentDidMount() {
        console.log("in componennt");
        const { navigation } = this.props;
        var userindex1 = navigation.getParam('userindex', 'NO-ID');
        console.log(userindex1);
        this.setState({
            userindex: userindex1,
        })
        this.DisplayData();
    }

    DisplayTotal = () => {

        console.log("indisplayyy total");
        var total = 0;
        this.userBooks.forEach((item, index) => {
            let integer = parseInt(item.bookprice, 10);
            total = total + integer;
        })
        this.setState(
            {
                totalValue: total,
            }
        )

    }

    DisplayData2 = async () => {
        console.log("in displaydataaa2");
        console.log(this.state.datatodisplay.length);
        let x = [];
        x = [...this.state.datatodisplay];
        x.forEach((item) => {
            flatlist.forEach((item1, index) => {
                if (item1.name == item) {
                    this.userBooks.push({
                        bookid: item1.id,
                        bookname: item1.name,
                        bookprice: item1.price,
                        bookquantity: 1,
                    })

                }
            })

        })
        console.log("userbookssss : " + this.userBooks.length);

        this.DisplayTotal();

    }

    DisplayData = async () => {
        console.log("in displaydataaa");
        try {
            const keys = await AsyncStorage.getAllKeys();
            if (keys.toString()) {
                const existing_users = await AsyncStorage.getItem('Users');
                let newlist = JSON.parse(existing_users);
                newlist.forEach((item, index) => {
                    if (index == this.state.userindex) {
                        console.log("found index " + index);
                        console.log(item.usercart.length);
                        this.setState({
                            datatodisplay: item.usercart,
                        })
                    }
                    console.log("dataaa" + this.state.datatodisplay.length);
                })
            }
            this.DisplayData2();
        } catch (error) {
            console.log('get users error', error.message);
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

    UpdateQuantityIncrease = (item) => {

        console.log("updatingg quantity...");
        var k = item.bookquantity + 1;
        let integer = parseInt(item.bookprice, 10);
        var tot = this.state.totalValue + integer;

        console.log(item.bookname + " " + item.bookquantity + " " + item.bookprice);
        var array = [...this.userBooks];
        var index = array.indexOf(item);
        if (index !== -1) {
            array.splice(index, 1);
            array.push({
                bookid: item.bookid,
                bookname: item.bookname,
                bookprice: item.bookprice,
                bookquantity: k,
            })
            this.userBooks = array;

            this.setState({
                flag: 1,
                totalValue: tot,

            })

        }
    }

    UpdateQuantityDecrease = (item) => {

        console.log("updatingg quantity...");
        var k = item.bookquantity - 1;
        if (k > -1) {
            let integer = parseInt(item.bookprice, 10);
            var tot = this.state.totalValue - integer;

            console.log(item.bookname + " " + item.bookquantity + " " + item.bookprice);
            var array = [...this.userBooks];
            var index = array.indexOf(item);
            if (index !== -1) {
                array.splice(index, 1);
                array.push({
                    bookid: item.bookid,
                    bookname: item.bookname,
                    bookprice: item.bookprice,
                    bookquantity: k,
                })
                this.userBooks = array;

                this.setState({
                    flag: 1,
                    totalValue: tot,

                })

            }
        }
    }

    static navigationOptions = {
        header: null
    }





    render() {
        const { navigation } = this.props;
        var userindex = navigation.getParam('userindex', 'NO-ID');
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Searchitem_Screen')}>
                    <Icon size={30} color="black" name="arrow-back" />
                </TouchableOpacity>
                <Text style={{ height: 60, alignItems: 'center', justifyContent: 'center', fontSize: 30, backgroundColor: '#006064', color: '#ffffff' }}>MY CART</Text>
                <FlatList
                    style={{ flex: 1, backgroundColor: '#B2EBF2' }}
                    ListHeaderComponent={this.renderHeader}
                    data={this.userBooks}
                    ItemSeparatorComponent={this.renderSeperator}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                < Text style={styles.enteries}>Book Name : {item.bookname}</Text>
                                < Text style={styles.enteries}>Book Price: Rs {item.bookprice}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ color: '#000000', fontWeight: '500', fontSize: 15 }}>Change Item Quantity</Text>
                                    <TouchableOpacity
                                        onPress={() => this.UpdateQuantityIncrease(item)}
                                    >
                                        <Text style={{ color: '#000000', fontWeight: '500', fontSize: 30, paddingHorizontal: 10 }}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this.UpdateQuantityDecrease(item)}
                                    >
                                        <Text style={{ color: '#000000', fontWeight: '500', fontSize: 30, paddingHorizontal: 10 }}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#000000', fontWeight: '500', fontSize: 15 }}>{item.bookquantity}</Text>
                                </View>


                            </View>

                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                <Text style={{ alignItems: 'center', justifyContent: 'center', fontSize: 30, backgroundColor: '#006064', color: '#ffffff' }}>Total Cart Value: {this.state.totalValue}</Text>
            </SafeAreaView>
        );

    }

}

const styles = StyleSheet.create({
    header: {
        fontFamily: 'Avenir',
        fontSize: 30,
        fontWeight: "bold",
        color: '#ffffff'
    },
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
        fontWeight: '300'

    },
})