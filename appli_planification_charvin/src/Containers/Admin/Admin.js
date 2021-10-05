import NavbarAdmin from '../../Components/NavbarAdmin/NavbarAdmin.js'
import Navbar from '../../Components/Navbar/Navbar.js'
import './Admin.css'
import { connect } from 'react-redux'

function Admin() {
    return (
        <>
            <Navbar/>
            <h1>Admin</h1>
        </>
    )
}

const mapStateToProps = (store) => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
