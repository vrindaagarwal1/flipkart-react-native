//import console = require("console");

//import console = require("console");
//import book_array from '../src/components/flatlist';

const defaultstate = {

    Users: [{
        username: 'test',
        password: '123',
        usercart: [],
        wishlist:[],
    }],

    currentUser: '',

    Books: [],

}


const addUserReducer = (state = defaultstate, action) => {

    console.log("in adduserreducer");
    switch (action.type) {

        case 'ADD_USER': {
            debugger
            console.log("in reducer switch case ; adding new user");
            return {
                ...state,
                Users: [].concat(state.Users).concat({
                    username: action.payload.username,
                    password: action.payload.password,
                    usercart: [],
                    wishlist:[],
                })
            }
        }

        case 'SETINDEX': {
            console.log("in reducer switch case : setting curent user index")
            return {
                ...state,
                currentUser: action.payload,
            }
        }

        case 'ADD_BOOK': {
            console.log("in reducer switch case:ADD BOOK")

            var flag = 0;
            let newUsers = [].concat(state.Users);
            newUsers[action.payload.userId].usercart.forEach((item) => {

                if (item.bookid == action.payload.bookid) {
                    console.log("book already exists in cart")
                    item.bookquantity = parseInt(item.bookquantity) + 1;
                    console.log("updated book quantity" + item.bookquantity)
                    flag = 1;
                }


            })
            if (flag == 0) {
                console.log("adding new book for the user")
                newUsers[action.payload.userId].usercart.push({
                    bookid: action.payload.bookid,
                    bookname: action.payload.bookname,
                    bookauthor: action.payload.bookauthor,
                    bookprice: action.payload.bookprice,
                    bookquantity: parseInt('1'),
                })
            }
            return {
                ...state,
                Users: newUsers
            }

        }

        case 'ADD_WISHLIST': {
            console.log("in reducer switch case:WISHLIST")

            var flag = 0;
            let newUsers = [].concat(state.Users);
            newUsers[action.payload.userId].wishlist.forEach((item) => {

                if (item.bookid == action.payload.bookid) {
                    console.log("book already exists in wishlist")
                    flag = 1;
                }


            })
            if (flag == 0) {
                console.log("adding book to wishlist")
                newUsers[action.payload.userId].wishlist.push({
                    bookid: action.payload.bookid,
                    bookname: action.payload.bookname,
                    bookauthor: action.payload.bookauthor,
                    bookprice: action.payload.bookprice,
                    bookimage:action.payload.bookimage,
                })
            }
            return {
                ...state,
                Users: newUsers
            }

        }

        case 'REDUCE_BOOK': {
            console.log("in reducer switch case:REDUCE BOOK")

            let newUsers = [].concat(state.Users);
            newUsers[action.payload.userId].usercart.forEach((item, index, object) => {

                if (item.bookid == action.payload.bookid) {

                    if (item.bookquantity > 1) {
                        item.bookquantity = parseInt(item.bookquantity) - 1;
                        console.log("updated book quantity" + item.bookquantity)
                        flag = 1;
                    }
                    else if (item.bookquantity == 1) {
                        object.splice(index, 1);
                    }
                }


            })
            return {
                ...state,
                Users: newUsers
            }

        }

        case 'ADD_BOOK_REVIEW': {

            console.log("in book review");
            console.log(action.payload.review + action.payload.userId + action.payload.bookid);
            console.log(state.Users.length);
            console.log(state.Books.length);

            var flag = 0;
            var existingbooks = [].concat(state.Books);
            var oldlist;

            
            existingbooks.forEach((item) => {
                console.log("hiii" + item.bookid + " ");
                if (item.bookid == action.payload.bookid) {
                    console.log("book found");
                    oldlist = [].concat(item.bookreview);
                    oldlist.push({
                        userId: action.payload.userId,
                        text: action.payload.review,
                    });
                    flag = 1;
                    item.bookreview = oldlist;
                }
            })

            if (flag == 0) {
                console.log("new book review");
                existingbooks = [].concat(existingbooks).concat({
                    bookid: action.payload.bookid,
                    bookreview: [].concat({
                        userId: action.payload.userId,
                        text: action.payload.review,
                    })

                })

                existingbooks.forEach((item) => {
                    console.log("book id for review" + item.bookid);
                    item.bookreview.forEach((book) => {
                        console.log("book reviews : " + book.userId + " " + book.text );
                    })
                })
            }

            return {
                ...state,
                Books: existingbooks
            }
        }

        default:
            return state;
    }

}

export default addUserReducer;