import { combineReducers } from 'redux'
import searchReducer from './SearchReducer'
import userReducer from './UserReducer'

export const reducer = combineReducers({ searchReducer, userReducer})