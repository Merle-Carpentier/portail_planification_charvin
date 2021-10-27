import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './NavbarAdmin.css'
import charvin from '../../asset/Charvin_Logistics.jpg'

//navigation responsive avec menu hamburger pour utilisateurs role "admin"
function NavbarAdmin() {

    //state pour faire apparaître/disparaitre menu + vérification largeur d'écran
    const [toogleNavAdmin, setToogleNavAdmin] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)

    //fonction pour faire apparaître ou non le menu
    const toogleNav = () => {
        setToogleNavAdmin(!toogleNavAdmin)
    }

    //au chargement on vérifie la taille de l'écran
    useEffect( ()=> {

        const ChangeWidth = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', ChangeWidth)

        return () => {
            window.removeEventListener('resize', ChangeWidth)
        }

    }, [])

    
    return (
        <div className="navbar-admin">

            <img className="navbar-admin-img" src={charvin} alt="logo Charvin"/>
            
            <button
                className="navbar-admin-btn"
                onClick = {toogleNav}
            >☰</button>
            {/*affichage conditionnel sur le menu en fonction si le toogle est true ou largeur écran > 768 */}
            {(toogleNavAdmin || width > 768) && (
                <nav className="navbar-admin-nav"> 
                    <ul className="navbar-admin-list">
                        <li className="navbar-admin-list-item-one">
                            <Link className="navbar-admin-list-item navbar-admin-list-item-1" to='/booking'>Planning</Link></li>
                        <li className="navbar-admin-list-item">
                            <Link className="navbar-admin-list-item navbar-admin-list-item-2" to='/stats'>Statistiques</Link></li>
                        <li className="navbar-admin-list-item">
                            <Link className="navbar-admin-list-item navbar-admin-list-item-3" to='/admin'>Administration</Link></li>
                        <li className="navbar-admin-list-item">
                            <Link className="navbar-admin-list-item navbar-admin-list-item-4" to='/logout'>Déconnexion</Link></li>
                    </ul>
                    
                </nav>
            )}
       </div>
       
    )
}

// appel au store redux
const mapStateToProps = (store => {
    return {
        user: store.user
    }
})
export default connect(mapStateToProps)(NavbarAdmin)
