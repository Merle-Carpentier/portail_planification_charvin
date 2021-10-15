import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')

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

        axios.get(`${configApi.api_url}/api/allWharehouses`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log('allwharehouses', response)
            dispatch(loadWharehousesSuccess(response.data.data))   
        })

        .catch((error) => {
            dispatch(loadWharehousesError(error))
            console.log('allWharehouses err', error.message) 
        })
    }
}
