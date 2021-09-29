//import des actions
import { LOAD_USER_INFO } from "../actions/userActions";
import { LOGOUT_USER } from "../actions/userActions";

//initialisation de la state
const INITIAL_STATE = {
    isLogged: false,
    infos: null
}


export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_USER_INFO:
            return {isLogged: true, infos: action.payload}
        
        case LOGOUT_USER:
        	return INITIAL_STATE;
        
    }
    
    return state;
}