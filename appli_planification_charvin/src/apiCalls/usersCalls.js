import axios from 'axios'
import { configApi } from './configApi'
const token = window.localStorage.getItem('rdvCharvin')

//Fichier des appels vers l'API (table users)

//ajout d'un utilisateur
export const addUser = (data) => {
    return axios.post(`${configApi.api_url}/api/addUser`, data, {headers: {"x-access-token": token}})
    .then((addUser) => {
        return addUser.data
    })
    .catch((error) => {
        console.log('addUser err', error) 
    })
}


//mise à jour utilisateur
export const updateUser = (data, id) => {
    return axios.put(`${configApi.api_url}/api/updateUser/${id}`, data, {headers: {"x-access-token": token}})
    .then((updateUser) => {
        return updateUser.data
    })
    .catch((error) => {
        console.log('updateUser err', error) 
    })
}


//récupération de tous les utilisateurs
export const allUsers = () => {
    return axios.get(`${configApi.api_url}/api/allUsers`, {headers: {"x-access-token": token}})
    .then((allUsers) => {
        return allUsers.data
    })
    .catch((error) => {
        console.log('allUsers err', error) 
    })
}


//detail d'un utilisateur
export const detailUser = (id) => {
    return axios.put(`${configApi.api_url}/api/detailUser/${id}`, {headers: {"x-access-token": token}})
    .then((detailUser) => {
        return detailUser.data
    })
    .catch((error) => {
        console.log('detailUser err', error) 
    })
}


//suppression d'un utilisateur
export const deleteUser = (id) => {
    return axios.delete(`${configApi.api_url}/api/deleteUser/${id}`, {headers: {"x-access-token": token}})
    .then((deleteUser) => {
        return deleteUser.data
    })
    .catch((error) => {
        console.log('deleteUser err', error) 
    })
}


//login d'un utilisateur
export const loginUser = (data) => {
    return axios.post(`${configApi.api_url}/api/login`, data)
    .then((loginUser) => {
        console.log("loginUser", loginUser)
        return loginUser
    })
    .catch((error) => {
        console.log('loginUser err', error) 
    })
}