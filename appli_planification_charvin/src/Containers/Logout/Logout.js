import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import { logoutUser } from '../../redux/actions/userActions'

//composant de déconnexion de l'utilisateur
export default function Logout() {
    //initialisation des states
    const [redirect, setRedirect] = useState(false)

    //initialisation du dispatch au store
    const dispatch = useDispatch()

    useEffect(() => {

        //dispatch de l'action au store
        dispatch(logoutUser())

        //suppression des clés dans le local storage
        window.localStorage.removeItem('rdvCharvin')
        window.localStorage.removeItem('utilisateurCharvin')

        //state de redirection
        setRedirect(true)

    }, [])

    //affichage avec un redirection conditionnelle
    return (
        <div>
            {redirect && <Redirect to='/login' />}
        </div>
    )
}

