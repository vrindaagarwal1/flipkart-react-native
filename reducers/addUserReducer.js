//import console = require("console");

//import console = require("console");
//import book_array from '../src/components/flatlist';

const defaultstate = {

    Users: [{
        username: 'test',
        password: '123',
        usercart: [],
    }],

    currentUser: '',

    Books:[],

    /*Books: [{
            id: "B1",
            name: "The Silence of the Lambs",
            image: "http://i.imgur.com/mEa8Hhs.png",
            author: "Thomas Harris",
            price: "580",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },

        {
            id: "B13",
            name: "Jurassic Park",
            image: "https://lh3.googleusercontent.com/-G-eCeJSghbw/VSEh1Yrz2vI/AAAAAAAABI0/Z6-vbKIhNEU/h120/51tn4xOHDqL.jpg",
            author: "Michael Crichton",
            price: "440",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },

        {
            id: "B10",
            name: "Dracula",
            image: "http://i.imgur.com/1zczIsH.jpg",
            author: "Bram Stoker",
            price: "260",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },


        {
            id: "B4",
            name: "In Cold Blood",
            image: "http://i.imgur.com/nF8D6lo.jpg",
            author: "Truman Capote",
            price: "490",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },
        {
            id: "B5",
            name: "The Da Vinci Code",
            image: "http://i.imgur.com/IUopb8k.jpg",
            author: "Dan Brown",
            price: "790",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },
        {
            id: "B6",
            name: "The Shining",
            image: "http://i.imgur.com/Ofz8Fzz.jpg",
            author: "Stephen King",
            price: "690",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },
        {
            id: "B7",
            name: "And Then There Were None",
            image: "https://lh3.googleusercontent.com/-SJwTH0r43Fg/VSEh1dBH3iI/AAAAAAAABIw/eCbMBuwno9w/h120/51o0UB-9YwL._SY344_BO1%2C204%2C203%2C200_.jpg",
            author: "Agatha Christie",
            price: "420",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },
        {
            id: "B8",
            name: "The Hunt tor Red October",
            image: "http://i.imgur.com/94BpAYI.jpg",
            author: "Tom Clancy",
            price: "590",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },
        {
            id: "B3",
            name: "Kiss the Girls",
            image: "http://i.imgur.com/1Mi4eCI.jpg",
            author: "James Patterson",
            price: "480",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
        },
        {
            id: "B9",
            name: "The Hound of the Baskervilles",
            image: "http://i.imgur.com/be0zLx0.jpg",
            author: "Sir Athur Conan Doyle",
            price: "1000",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },

        {
            id: "B11",
            name: "The Stand",
            image: "http://i.imgur.com/94WDykQ.jpg",
            author: "Stephen King",
            price: "180",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },


        {
            id: "B12",
            name: "The Bone Collector",
            image: "http://i.imgur.com/zwCLZKX.jpg",
            author: "Jeffery Deaver",
            price: "1200",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        },
        {
            id: "B2",
            name: "The Girl with the Dragon Tattoo",
            image: "http://i.imgur.com/KMhDOCS.jpg",
            author: "Stieg Larsson",
            price: "560",
            summary: "As part of the search for a serial murderer nicknames Buffalo Bill, FBI trainee Clarice Starling is given an assignment. She must visit a man confined to a high-security facility for the criminally insane and interview him",
            reviews: [],
        }

    ],*/

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
            
            var flag=0;
            var existingbooks=[].concat(state.Books);
            var oldlist;
            
            debugger
            existingbooks.forEach((item)=>{
                console.log("hiii" + item.bookid + " " );
                if(item.bookid==action.payload.bookid){
                    console.log("book found");
                    oldlist=[].concat(item.bookreview);
                    oldlist.push(action.payload.review);
                    flag=1;
                    item.bookreview=oldlist;

                    
                }
            })

            if(flag==0){
                console.log("new book review");
                existingbooks=[].concat(existingbooks).concat({
                    bookid: action.payload.bookid,
                    bookreview: [].concat(action.payload.review),
                })

                existingbooks.forEach((item)=>{
                    console.log("book id for review" + item.bookid);
                    item.userreviews.forEach((itemm)=>{
                     console.log(itemm);
                    })
                })
            }

            return {
                ...state,
               Books:existingbooks
            }
        }

        default:
            return state;
    }

}

export default addUserReducer;