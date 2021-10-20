import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.js'
import Navbar from '../Navbar/Navbar.js'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

//composant pour vérifier si l'utilisateur est un user ou admin pour limiter l'accès et choisir la barre de navigation
export default function Authorized() {
    //je récupère les infos utilisateur dans la store
    const infos = useSelector(state => state.userReducer.infos)

    //je récupère mon token dans le local storage
    const token = localStorage.rdvCharvin

    //state pour le return
    const [authorized, setAuthorized] = useState(false)
    const [redirect, setRedirect] = useState(false)

    //au chargement, je vérifie si j'ai les infos utilisateur dans le store et le token + affichage de la barre de navigation enfonction du role utilisateur
    useEffect(() => {
        if(infos.length === 0 || !token) {
            localStorage.clear()
            setRedirect(true)
        }else if(infos.role === "admin") {
            setAuthorized(true)
        }else {
            setAuthorized(false)
        }
        
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
