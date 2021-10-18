import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from 'redux-thunk'
import  userReducer  from '../redux/reducers/userReducer'
import wharehouseReducer from "./reducers/wharehouseReducer"
import userOfBddReducer from "./reducers/userOfBddReducer"
import customerReducer from "./reducers/customerReducer"


//groupage des tous les reducers dans rootReducer
const rootReducer = combineReducers({
    userReducer,
    wharehouseReducer,
    userOfBddReducer,
    customerReducer
})

//création du store en récupérant tous les reducers
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store