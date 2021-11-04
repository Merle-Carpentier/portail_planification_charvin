//import des actions
import { LOAD_BOOKINGS, LOAD_BOOKINGS_SUCCESS, LOAD_BOOKINGS_BY_ID_SUCCESS, LOAD_BOOKINGS_ERROR, ADD_BOOKING, MODIF_BOOKING, DELETE_BOOKING } from "../actions/bookingActions";

//initialisation de la state de départ (toujours un objet)
const INITIAL_STATE = {
    isLoading: false,     //affichage message de chargement lors de la requète
    bookings: [],         //tous les rdv dans la page admin
    bookingsById: [],     //rdv obtenus par l'id de l'entrepôt ou du client (soit l'un soit l'autre)
    error: ""             //message d'erreur de la requète
}

//(prevState, action) => newState action.type renvoi au type du fichier action
//reducer lié au rdv
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
        
        case LOAD_BOOKINGS_BY_ID_SUCCESS: 
            return {
                ...state,
                isLoading: false,
                bookingsById: action.payload
            }

        case LOAD_BOOKINGS_ERROR: 
            return {
                ...state,
                isLoading: false,
                bookings: [],
                error: action.payload
            }


        case ADD_BOOKING:
            const newArrAdd = [...state.bookingsById]
            newArrAdd.unshift(action.payload)
            return {
                bookingsById: newArrAdd
            }

        case MODIF_BOOKING: 
            const newArrModif = [...state.bookingsById]
            const indexModif = newArrModif.indexOf(action.payload._id)
            newArrModif.splice(indexModif, 1, action.payload)
            return {
                bookingsById: newArrModif
            }

        case DELETE_BOOKING:
            const newArrDel = [...state.bookingsById]
            const indexDelete = newArrDel.indexOf(action.payload._id)
            newArrDel.splice(indexDelete, 1)
            return {
                bookingsById: newArrDel
            }
        
        default: return state
    }

}

export default bookingReducer
