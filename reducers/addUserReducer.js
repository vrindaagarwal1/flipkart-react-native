//import console = require("console");

//import console = require("console");

const defaultstate = {

    Users: [{
        username: 'test',
        password: '123',
        usercart: [], 
    }],

    currentUser: '',

}


const addUserReducer = (state = defaultstate, action) => {

    console.log("in adduserreducer");
    switch (action.type) {

        case 'ADD_USER': {

            console.log("in reducer switch case ; adding new user");
            return {
                ...state,
                Users: [].concat(state.Users).concat({
                    username: action.payload.username,
                    password: action.payload.password,
                    usercart: [],
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


        default:
            return state;
    }

}

export default addUserReducer;