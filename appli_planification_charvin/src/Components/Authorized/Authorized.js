import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.js'
import Navbar from '../Navbar/Navbar.js'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin

//composant pour vérifier si l'utilisateur est un user ou admin pour limiter l'accès et choisir la barre de navigation
export default function Authorized() {
    //je récupère les infos utilisateur dans le store
    const infos = useSelector(state => state.userReducer.infos)

    
    //state pour le return
    const [authorized, setAuthorized] = useState(false)
    const [redirect, setRedirect] = useState(false)

    //fonction qui vérifie la validité de mon token et les infos de mon utilisateur
    const getValidityUser = () => {
        axios.get(`${configApi.api_url}/api/checkToken`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log('reponse valid token', response)

            if(response.status === 200) {
                if(infos.length === 0) {
                    localStorage.clear()
                    setRedirect(true)
                }else if(infos.role === "admin") {
                    setAuthorized(true)
                }else {
                    setAuthorized(false)
                }
            }
            
        })
        .catch((error) => {
            console.log('err valid token', error)
            setRedirect(true)
        })
    }


    //au chargement, je vérifie si j'ai les infos utilisateur dans le store et le token + affichage de la barre de navigation enfonction du role utilisateur
    useEffect(() => {

        getValidityUser()

    }, [])

    //rendu conditionnel affichage du menu 4 choix ou du menu 2 choix en fonction du role utilisateur
    return (
        <>
        {redirect && <Redirect to='/' />}
        {authorized ?
            <NavbarAdmin/>   
        :<Navbar />
        }
        </>
    )
}
