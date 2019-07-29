/*import {createStore} from 'redux'

import addUserReducer from '../reducers/addUserReducer'

export default store=createStore(addUserReducer)*/


import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import addUserReducer from '../reducers/addUserReducer';


const PersistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(PersistConfig, addUserReducer)

const  configureStore =() => {
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};

const {store} = configureStore();

export default store;

