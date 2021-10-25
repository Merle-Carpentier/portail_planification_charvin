//import des actions
import { LOAD_USERSBDD, LOAD_USERSBDD_SUCCESS, LOAD_USERSBDD_ERROR } from "../actions/userOfBddActions"

//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLoading: false,   //message de chargement lors de la requète
    usersBdd: [],       //tableau de tous les utilisateurs
    error: ""           //message d'erreur de la requète
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié aux utilisateurs stockés en bdd
const userOfBddReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_USERSBDD: 
            return {
                ...state,
                isLoading: true
            }
        

        case LOAD_USERSBDD_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                usersBdd: action.payload
            }
        

        case LOAD_USERSBDD_ERROR: 
            return {
                ...state,
                isLoading: false,
                usersBdd: [],
                error: action.payload
            }
        
        default: return state
    }

}

export default userOfBddReducer
