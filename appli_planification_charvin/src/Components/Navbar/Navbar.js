import './Navbar.css'

export default function Navbar() {
    return (
       <nav className="navbar">
           <ul className="navbar-list">
               <li className="navbar-list-item">Planning</li>
               <li className="navbar-list-item">Déconnexion</li>
           </ul>
           <button className="navbar-btn">Menu</button>
       </nav>
    )
}
