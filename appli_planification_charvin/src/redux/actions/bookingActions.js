import axios from 'axios'
import { logoutUser } from './userActions'
import { configApi } from '../../apiCalls/configApi'

const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin


//types d'action
export const LOAD_BOOKINGS = "LOAD_BOOKINGS"                             //message de chargement pendant la requète
export const LOAD_BOOKINGS_SUCCESS = "LOAD_BOOKINGS_SUCCESS"             //chargement du tableau de tous les rdv
export const LOAD_BOOKINGS_BY_ID_SUCCESS = "LOAD_BOOKINGS_BY_ID_SUCCESS" //chargement du tableau des rdv par entrepôt ou client
export const LOAD_BOOKINGS_ERROR = "LOAD_BOOKINGS_ERROR"                 //message requète en erreur
export const ADD_BOOKING = "ADD_BOOKING"                                 //ajouter un rdv dans la page booking
export const MODIF_BOOKING = "MODIF_BOOKING"                             //modifier un rdv dans la page booking
export const DELETE_BOOKING = "DELETE_BOOKING"                           //supprimer un rdv dans la page booking

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

const loadBookingsByIdSuccess = bookingsById => {
    return {
        type: LOAD_BOOKINGS_BY_ID_SUCCESS,
        payload: bookingsById
    } 
}

const loadBookingsError = error => {
    return {
        type: LOAD_BOOKINGS_ERROR,
        payload: error
    } 
}

export const addBooking = newAdd => {
    return {
        type: ADD_BOOKING,
        payload: newAdd
    }
}

export const modifBooking = modifBook => {
    return {
        type: MODIF_BOOKING,
        payload: modifBook
    }
}

export const deleteBooking = deleteBook => {
    return {
        type: DELETE_BOOKING,
        payload: deleteBook
    }
}

//fonction d'appel vers l'api pour récupérer tous les rdv
export const allBookings = () => {
    return dispatch => {

        dispatch(loadBookings())

        axios.get(`${configApi.api_url}/api/allBookings`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log('allUsersbdd', response)
            dispatch(loadBookingsSuccess(response.data.data))   
        })

        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            dispatch(loadBookingsError(error))
            console.log('Bookings err', error.message) 
        })
    }
}

//fonction d'appel vers l'api pour récupérer tous les rdv d'un entrepôt
export const bookingsByWharehouse = (whId) => {
    return dispatch => {

        dispatch(loadBookings())

        axios.get(`${configApi.api_url}/api/bookingsByWharehouse/${whId}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            dispatch(loadBookingsByIdSuccess(response.data.data))
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            dispatch(loadBookingsError(error))
            console.log('Bookings err', error.message) 
        })
    }
}


//fonction d'appel vers l'api pour récupérer tous les rdv d'un client
export const bookingsByCustomer = (custId) => {
    return dispatch => {

        dispatch(loadBookings())

        axios.get(`${configApi.api_url}/api/bookingsByCustomer/${custId}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            dispatch(loadBookingsByIdSuccess(response.data.data))
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            dispatch(loadBookingsError(error))
            console.log('Bookings err', error.message) 
        })
    }
}