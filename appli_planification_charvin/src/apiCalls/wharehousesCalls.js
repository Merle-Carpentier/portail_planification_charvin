import axios from 'axios'
import { configApi } from './configApi'
const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')

//Fichier des appels vers l'API (table wharehouses)

//ajout d'un entrepôt
export const addWharehouse = (data) => {
    return axios.post(`${configApi.api_url}/api/addWharehouse`, data, {headers: {"x-access-token": token, "userId": userId}})
    .then((addWharehouse) => {
        return addWharehouse.data
    })
    .catch((error) => {
        console.log('addWharehouse err', error) 
    })
}


//mise à jour d'un entrepôt
export const updateWharehouse = (data, id) => {
    return axios.put(`${configApi.api_url}/api/updateWharehouse/${id}`, data, {headers: {"x-access-token": token, "userId": userId}})
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
    return axios.put(`${configApi.api_url}/api/detailWharehouse/${id}`, {headers: {"x-access-token": token, "userId": userId}})
    .then((detailWharehouse) => {
        return detailWharehouse.data
    })
    .catch((error) => {
        console.log('detailWharehouse err', error) 
    })
}


//suppression d'un entrepôt => se trouve dans composant adminWharehouse