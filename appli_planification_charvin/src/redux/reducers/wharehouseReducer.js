//import des actions
import { LOAD_WHAREHOUSES, LOAD_WHAREHOUSES_SUCCESS, LOAD_WHAREHOUSES_ERROR } from "../actions/wharehouseActions"

//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLoading: false,  //message chargement lors de la requète
    wharehouses: [],   //tableau de tous les entrepôts
    error: ""          //message d'erreur de la requète
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié aux entrepôts
const wharehouseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_WHAREHOUSES: 
            return {
                ...state,
                isLoading: true
            }
        

        case LOAD_WHAREHOUSES_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                wharehouses: action.payload
            }
        

        case LOAD_WHAREHOUSES_ERROR: 
            return {
                ...state,
                isLoading: false,
                wharehouses: [],
                error: action.payload
            }
        
        default: return state
    }

}

export default wharehouseReducer
