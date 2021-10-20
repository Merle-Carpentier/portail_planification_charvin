//import des actions
import { LOAD_BOOKINGS, LOAD_BOOKINGS_SUCCESS, LOAD_BOOKINGS_ERROR } from "../actions/bookingActions";

//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLoading: false,
    bookings: [],
    error: ""
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié à l'utilisateur: soit il est connecté, soit non
const bookingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOAD_BOOKINGS: 
            return {
                ...state,
                isLoading: true
            }
        

        case LOAD_BOOKINGS_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bookings: action.payload
            }
        

        case LOAD_BOOKINGS_ERROR: 
            return {
                ...state,
                isLoading: false,
                bookings: [],
                error: action.payload
            }
        
        default: return state
    }

}

export default bookingReducer
