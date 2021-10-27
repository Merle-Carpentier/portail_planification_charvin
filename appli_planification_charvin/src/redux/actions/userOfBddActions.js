import axios from 'axios'
import { logoutUser } from './userActions'
import { configApi } from '../../apiCalls/configApi'

const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin

//types d'action
export const LOAD_USERSBDD = "LOAD_USERSBDD"
export const LOAD_USERSBDD_SUCCESS = "LOAD_USERSBDD_SUCCESS"
export const LOAD_USERSBDD_ERROR = "LOAD_USERSBDD_ERROR"

const loadUsersBdd = () => {
        return {
            type: LOAD_USERSBDD  
        } 
}

const loadUsersBddSuccess = usersBdd => {
        return {
            type: LOAD_USERSBDD_SUCCESS,
            payload: usersBdd
        } 
}

const loadUsersBddError = error => {
        return {
            type: LOAD_USERSBDD_ERROR,
            payload: error
        } 
}

//fonction d'appel vers l'api pour récupérer tous les utilisateurs
export const allUsersBdd = () => {
    return dispatch => {

        dispatch(loadUsersBdd())

        axios.get(`${configApi.api_url}/api/allUsers`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log('allUsersbdd', response)
            dispatch(loadUsersBddSuccess(response.data.data))   
        })

        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            dispatch(loadUsersBddError(error))
            console.log('usersbdd err', error.message) 
        })
    }
}