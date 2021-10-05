import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { logoutUser } from '../../redux/actions/userActions'

//composant de déconnexion de l'utilisateur
function Logout() {
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        logoutUser()
        window.localStorage.removeItem('rdvCharvin')
        setRedirect(true)

    }, [])


    return (
        <div>
            {redirect && <Redirect to='/login' />}
        </div>
    )
}

const mapDispatchToProps = {
	logoutUser
}

const mapStateToProps = (store)=>{
	return {
		user: store.user
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
