import NavbarAdmin from '../NavbarAdmin/NavbarAdmin.js'
import Navbar from '../Navbar/Navbar.js'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { logoutUser } from '../../redux/actions/userActions.js'


//composant pour vérifier si l'utilisateur est un user ou admin pour limiter l'accès et choisir la barre de navigation
export default function Authorized() {
    //je récupère les infos utilisateur dans le store
    const infos = useSelector(state => state.userReducer.infos)

    //j'initialise mon dispatch pour mes actions du store
    const dispatch = useDispatch()
    
    //state pour le return
    const [authorized, setAuthorized] = useState(false)
    const [redirect, setRedirect] = useState(false)

    //fonction pour vérifier les infos de l'utilisateur sont bien dans le store et afficher la bonne navBar en fonction du role
    const getGoodNavbar = ()=> {
        if(infos===null) {
            dispatch(logoutUser())
            return setRedirect(true)
        }else {
            if(infos.role === "admin") {
                setAuthorized(true)
            }else {
                setAuthorized(false)
            }
        }

    }

    
    useEffect(() => {
        getGoodNavbar()
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
