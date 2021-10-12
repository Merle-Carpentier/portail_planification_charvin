import axios from 'axios'
import { configApi } from './configApi'
const token = window.localStorage.getItem('rdvCharvin')

//Fichier des appels vers l'API (table wharehouses)

//ajout d'un entrepôt
export const addWharehouse = (data) => {
    return axios.post(`${configApi.api_url}/api/addWharehouse`, data, {headers: {"x-access-token": token}})
    .then((addWharehouse) => {
        return addWharehouse.data
    })
    .catch((error) => {
        console.log('addWharehouse err', error) 
    })
}


//mise à jour d'un entrepôt
export const updateWharehouse = (data, id) => {
    return axios.put(`${configApi.api_url}/api/updateWharehouse/${id}`, data, {headers: {"x-access-token": token}})
    .then((updateWharehouse) => {
        return updateWharehouse.data
    })
    .catch((error) => {
        console.log('updateWharehouse err', error) 
    })
}


//récupération de tous les entrepôts => se trouve dans fichier wharehouseActions dans redux


//detail d'un entrepôt
export const detailWharehouse = (id) => {
    return axios.put(`${configApi.api_url}/api/detailWharehouse/${id}`, {headers: {"x-access-token": token}})
    .then((detailWharehouse) => {
        return detailWharehouse.data
    })
    .catch((error) => {
        console.log('detailWharehouse err', error) 
    })
}


//suppression d'un entrepôt
export const deleteWharehouse = (id) => {
    return axios.delete(`${configApi.api_url}/api/deleteWharehouse/${id}`, {headers: {"x-access-token": token}})
    .then((deleteWharehouse) => {
        return deleteWharehouse.data
    })
    .catch((error) => {
        console.log('deleteWharehouse err', error) 
    })
}