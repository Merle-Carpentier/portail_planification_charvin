//import des actions
import { LOAD_BOOKINGS, LOAD_BOOKINGS_SUCCESS, LOAD_BOOKINGS_ERROR, ADD_BOOKING, MODIF_BOOKING, DELETE_BOOKING } from "../actions/bookingActions";

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

        case ADD_BOOKING:
            const newArrBookings = [...state.bookings]
            newArrBookings.unshift(action.payload)
            return {
                bookings: newArrBookings
            }

        case MODIF_BOOKING: 
            const newArrBookings = [...state.bookings]
            const newArrBookings = [...state.bookings]
            const indexDelete = newArrBookings.indexOf(action.payload._id)
            newArrBookings.splice(indexDelete, 1)
            newArrBookings.unshift(action.payload)
            return {
                bookings: newArrBookings
            }

        case DELETE_BOOKING:
            const newArrBookings = [...state.bookings]
            const indexDelete = newArrBookings.indexOf(action.payload._id)
            newArrBookings.splice(indexDelete, 1)
            return {
                bookings: newArrBookings
            }
        
        default: return state
    }

}

export default bookingReducer
