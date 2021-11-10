import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'


//types d'action
export const LOAD_CUSTOMERS = "LOAD_CUSTOMERS"
export const LOAD_CUSTOMERS_SUCCESS = "LOAD_CUSTOMERS_SUCCESS"
export const LOAD_CUSTOMERS_ERROR = "LOAD_CUSTOMERS_ERROR"

const loadCustomers = () => {
        return {
            type: LOAD_CUSTOMERS  
        } 
}

const loadCustomersSuccess = customers => {
        return {
            type: LOAD_CUSTOMERS_SUCCESS,
            payload: customers
        } 
}

const loadCustomersError = error => {
        return {
            type: LOAD_CUSTOMERS_ERROR,
            payload: error
        } 
}

//fonction d'appel vers l'api pour récupérer tous les clients
export const allCustomers = () => {
    return dispatch => {

        dispatch(loadCustomers())

        axios.get(`${configApi.api_url}/api/allCustomers`)
        .then((response) => {
            //console.log('allcustomers', response)
            dispatch(loadCustomersSuccess(response.data.data))   
        })

        .catch((error) => {
            dispatch(loadCustomersError(error))
            console.log('allCustomers err', error.message) 
        })
    }
}
