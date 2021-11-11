import Authorized from '../../Components/Authorized/Authorized.js'
import AdminWharehouse from '../../Components/composants_page_admin/AdminWharehouse.js'
import AdminUserOfBdd from '../../Components/composants_page_admin/AdminUserOfBdd.js'
import AdminCustomer from '../../Components/composants_page_admin/AdminCustomer.js'
import AdminBooking from '../../Components/composants_page_admin/AdminBooking.js'


export default function Admin() {


    return (
        <>
            <Authorized />

            <div className="admin">
            <AdminWharehouse />
            <AdminCustomer />
            <AdminUserOfBdd />
            <AdminBooking />
            </div>
        </>
    )
}

