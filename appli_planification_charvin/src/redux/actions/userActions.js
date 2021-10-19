import axios from "axios"
import { configApi } from '../../apiCalls/configApi'

//types d'actions
export const LOAD_USER_INFO = "LOAD_USER_INFO"
export const LOGOUT_USER = "LOGOUT_USER"


//actions
export const loadUserInfo = user => {
    return {
        type: LOAD_USER_INFO,
        payload: user
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

//fonction d'appel vers l'api pour récupérer les infos utilisateur
export const loginUser = (data) => {
    return dispatch => {

        axios.post(`${configApi.api_url}/api/login`, data)
        .then((response) => {
            console.log("response.data", response.data)
            //dispatch(loadUserInfo(response.data.data))
        })
        .catch((error) => {
            dispatch(logoutUser())
            console.log('allCustomers err', error.message)
        })
    }
}
