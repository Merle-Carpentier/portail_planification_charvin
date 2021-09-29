import './NavbarAdmin.css'

export default function NavbarAdmin() {
    return (
        <nav className="navbar-admin">
           <ul className="navbar-admin-list">
               <li className="navbar-admin-list-item">Planning</li>
               <li className="navbar-admin-list-item">Statistiques</li>
               <li className="navbar-admin-list-item">Administration</li>
               <li className="navbar-admin-list-item">Déconnexion</li>
           </ul>
           <button className="navbar-admin-btn">Menu</button>
       </nav>
    )
}
