import axios from 'axios'
import { logoutUser } from './userActions'
import { configApi } from '../../apiCalls/configApi'

const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin


//types d'action
export const LOAD_BOOKINGS = "LOAD_BOOKINGS"                             //message de chargement pendant la requète
export const LOAD_BOOKINGS_SUCCESS = "LOAD_BOOKINGS_SUCCESS"             //chargement du tableau de tous les rdv
export const LOAD_BOOKINGS_ERROR = "LOAD_BOOKINGS_ERROR"                 //message requète en erreur


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

