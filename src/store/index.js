import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import * as userInfoData from './userInfo/reducer';
import * as shopData from './shop/reducer';
let store = createStore(
    combineReducers({...userInfoData, ...shopData }),
    applyMiddleware(thunk)
)

export default store;