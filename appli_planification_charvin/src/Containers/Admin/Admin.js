import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin.js'
import Navbar from '../../Components/Navbar/Navbar.js'
import './Admin.css'
import { connect } from 'react-redux'
import AdminWharehouse from '../../Components/page admin/AdminWharehouse/AdminWharehouse.js'


export default function Admin() {
    return (
        <>
            <NavbarAdmin/>
            <AdminWharehouse />
            <h1>Admin</h1>

        
        </>
    )
}

