import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import  userReducer  from '../redux/reducers/userReducer'


//groupage des tous les reducers dans rootReducer
const rootReducer = combineReducers({
    userReducer
})

//création du store en récupérant tous les reducers
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store