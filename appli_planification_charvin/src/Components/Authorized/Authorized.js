import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.js'
import Navbar from '../Navbar/Navbar.js'
import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

//composant pour vérifier si l'utilisateur est un user ou admin pour limiter l'accès et choisir la barre de navigation
export default function Authorized() {
    //je récupère le role utilisateur dans la storage
    const token = window.localStorage.getItem('rdvCharvin')
    const role = window.localStorage.getItem('role')
    const id = window.localStorage.getItem('id')

    //state pour le return
    const [authorized, setAuthorized] = useState()

    //au chargement, je vérifie le role
    useEffect(() => {
        if(!role || !token || !id) {
            window.localStorage.clear()
            setAuthorized(null)
        }else if(token && id && role === "admin") {
            setAuthorized(true)
        }else {
            setAuthorized(false)
        }
        
    }, [])

    //rendu conditionnel
    return (
        <>
        
        {authorized === null ?
            <Redirect to='/login' />
        :authorized === true ?
            <NavbarAdmin/>
        :<Navbar />
        }
        </>
    )
}
