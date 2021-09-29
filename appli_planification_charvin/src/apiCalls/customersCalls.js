import axios from 'axios'
import { configApi } from './configApi'
const token = window.localStorage.getItem('rdvCharvin')

//Fichier des appels vers l'API (table customers)

//ajout d'un client
export const addCustomer = (data) => {
    return axios.post(`${configApi.api_url}/api/addCustomer`, data, {headers: {"x-access-token": token}})
    .then((addCustomer) => {
        return addCustomer.data
    })
    .catch((error) => {
        console.log('addCustomer err', error) 
    })
}


//mise à jour d'un client
export const updateCustomer = (data, id) => {
    return axios.put(`${configApi.api_url}/api/updateCustomer/${id}`, data, {headers: {"x-access-token": token}})
    .then((updateCustomer) => {
        return updateCustomer.data
    })
    .catch((error) => {
        console.log('updateCustomer err', error) 
    })
}


//récupération de tous les clients
export const allCustomers = () => {
    return axios.get(`${configApi.api_url}/api/allCustomers`, {headers: {"x-access-token": token}})
    .then((allCustomers) => {
        return allCustomers.data
    })
    .catch((error) => {
        console.log('allCustomers err', error) 
    })
}


//detail d'un client
export const detailCustomer = (id) => {
    return axios.put(`${configApi.api_url}/api/detailCustomer/${id}`, {headers: {"x-access-token": token}})
    .then((detailCustomer) => {
        return detailCustomer.data
    })
    .catch((error) => {
        console.log('detailCustomer err', error) 
    })
}


//suppression d'un client
export const deleteCustomer = (id) => {
    return axios.delete(`${configApi.api_url}/api/deleteCustomer/${id}`, {headers: {"x-access-token": token}})
    .then((deleteCustomer) => {
        return deleteCustomer.data
    })
    .catch((error) => {
        console.log('deleteCustomer err', error) 
    })
}