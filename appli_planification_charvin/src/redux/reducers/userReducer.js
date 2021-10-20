//import des actions
import { LOAD_USER_INFO, LOGOUT_USER } from "../actions/userActions";


//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLogged: false,
    infos: []
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié à l'utilisateur: soit il est connecté, soit non
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_USER_INFO: 
            return {
                ...state,
                isLogged: true,
                infos: action.payload
            }
        
        case LOGOUT_USER: 
        	return {
                INITIAL_STATE 
            }
        
        default: return state
    }
}

export default userReducer