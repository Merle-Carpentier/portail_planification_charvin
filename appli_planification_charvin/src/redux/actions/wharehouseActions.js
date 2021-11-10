import axios from 'axios'
import { logoutUser } from './userActions'
import { configApi } from '../../apiCalls/configApi'

const token = localStorage.rdvCharvin

//types d'action
export const LOAD_WHAREHOUSES = "LOAD_WHAREHOUSES"
export const LOAD_WHAREHOUSES_SUCCESS = "LOAD_WHAREHOUSES_SUCCESS"
export const LOAD_WHAREHOUSES_ERROR = "LOAD_WHAREHOUSES_ERROR"

const loadWharehouses = () => {
        return {
            type: LOAD_WHAREHOUSES  
        } 
}

const loadWharehousesSuccess = wharehouses => {
        return {
            type: LOAD_WHAREHOUSES_SUCCESS,
            payload: wharehouses
        } 
}

const loadWharehousesError = error => {
        return {
            type: LOAD_WHAREHOUSES_ERROR,
            payload: error
        } 
}

//fonction d'appel vers l'api pour récupérer tous les entrepôts
export const allWharehouses = () => {
    return dispatch => {

        dispatch(loadWharehouses())

        axios.get(`${configApi.api_url}/api/allWharehouses`, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            //console.log('allwharehouses', response)
            dispatch(loadWharehousesSuccess(response.data.data))   
        })

        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            dispatch(loadWharehousesError(error))
            console.log('allWharehouses err', error.message) 
        })
    }
}
