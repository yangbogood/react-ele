import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import userReducer from './reducer';
let store = createStore(
    userReducer,
    applyMiddleware(thunk)
)

export default store;