import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'

const token = localStorage.rdvCharvin
const userCharvin = JSON.parse(localStorage.userCharvin)
const userId = userCharvin[0].id

//types d'action
export const LOAD_BOOKINGS = "LOAD_BOOKINGS"
export const LOAD_BOOKINGS_SUCCESS = "LOAD_BOOKINGS_SUCCESS"
export const LOAD_BOOKINGS_ERROR = "LOAD_BOOKINGS_ERROR"
export const ADD_BOOKING = "ADD_BOOKING"
export const MODIF_BOOKING = "MODIF_BOOKING"
export const DELETE_BOOKING = "DELETE_BOOKING"

const loadBookings = () => {
    return {
        type: LOAD_BOOKINGS  
    } 
}

const loadBookingsSuccess = bookings => {
    return {
        type: LOAD_BOOKINGS_SUCCESS,
        payload: bookings
    } 
}

const loadBookingsError = error => {
    return {
        type: LOAD_BOOKINGS_ERROR,
        payload: error
    } 
}

const addBooking = newAdd => {
    return {
        type: ADD_BOOKING,
        payload: newAdd
    }
}

const modifBooking = modifBook => {
    return {
        type: MODIF_BOOKING,
        payload: modifBook
    }
}

const deleteBooking = deleteBook => {
    return {
        type: DELETE_BOOKING,
        payload: deleteBook
    }
}

//fonction d'appel vers l'api pour récupérer tous les entrepôts
export const allBookings = () => {
    return dispatch => {

        dispatch(loadBookings())

        axios.get(`${configApi.api_url}/api/allBookings`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log('allUsersbdd', response)
            dispatch(loadBookingsSuccess(response.data.data))   
        })

        .catch((error) => {
            dispatch(loadBookingsError(error))
            console.log('Bookings err', error.message) 
        })
    }
}