import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { logoutUser } from '../../redux/actions/userActions'

//composant de déconnexion de l'utilisateur
export default function Logout() {
    //initialisation des states
    const [redirect, setRedirect] = useState(false)

    //j'initialise mon dispatch d'actions
    const dispatch = useDispatch()

    //je pointe mon tableau des infos utilisateur
    const {infos} = useSelector(state => ({...state.userReducer.infos}))

    useEffect(() => {

        //dispatch de l'action au store
        dispatch(logoutUser())
        infos.length = 0

        //suppression des clés dans le local storage
        localStorage.clear()

        //state de redirection
        setRedirect(true)

    }, [])

    //affichage avec un redirection conditionnelle
    return (
        <div>
            {redirect && <Redirect to='/' />}
        </div>
    )
}

