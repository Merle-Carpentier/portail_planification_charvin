/*import des actions
import { LOAD_USER_INFO } from "../actions/userActions";
import { LOGOUT_USER } from "../actions/userActions";*/

//definition des actions types
export const LOAD_USER_INFO = "LOAD_USER_INFO"
export const LOGOUT_USER = "LOGOUT_USER"

//initialisation de la state (toujours un objet)
const INITIAL_STATE = {
    isLogged: false,
    infos: null
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié à l'utilisateur: soit il est connecté, soit non
export default function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_USER_INFO: {
            return {
                isLogged: true,
                infos: action.payload
            }
        }

        case LOGOUT_USER: {
        	return {
                INITIAL_STATE 
            }
        } 
    }

    return state
}