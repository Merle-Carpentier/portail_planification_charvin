import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import charvin from '../../asset/Charvin_Logistics.jpg'
import './Navbar.css'

function Navbar() {
    return (
       <nav className="navbar">
           <ul className="navbar-list">
                <li className="navbar-list-item">
                    <Link className="navbar-list-item navbar-list-item-1" to='/booking'>Planning</Link></li>
                <li className="navbar-list-item">
                    <img className="navbar-img" src={charvin} alt="logo Charvin"/>
                </li>
                <li className="navbar-list-item">
                    <Link className="navbar-list-item navbar-list-item-2" to='/logout'>Déconnexion</Link></li>
           </ul>
       </nav>
    )
}


// appel au store redux
const mapStateToProps = (store => {
    return {
        user: store.user
    }
})
export default connect(mapStateToProps)(Navbar)