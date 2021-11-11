//import des actions
import { LOAD_CUSTOMERS, LOAD_CUSTOMERS_SUCCESS, LOAD_CUSTOMERS_ERROR } from '../actions/customerActions'


//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLoading: false,   //message de chargement pendant la requête
    customers: [],      //tableau de tous les clients
    error: ""           //message d'erreur requète
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié aux cients
const customerReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_CUSTOMERS: 
            return {
                ...state,
                isLoading: true
            }
        

        case LOAD_CUSTOMERS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                customers: action.payload
            }
        

        case LOAD_CUSTOMERS_ERROR: 
            return {
                ...state,
                isLoading: false,
                customers: [],
                error: action.payload
            }
        
        default: return state
    }

}

export default customerReducer
