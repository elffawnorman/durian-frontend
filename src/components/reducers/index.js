import { combineReducers} from 'redux';
import {userReducer, userDetailReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { cartReducer } from './cartReducer';
import { drawerReducer } from './drawerReducer';


const rootReducer = combineReducers({
    user: userReducer,
    userInfo: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    userDetails: userDetailReducer

});


export default rootReducer;