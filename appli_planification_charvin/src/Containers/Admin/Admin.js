import Authorized from '../../Components/Authorized/Authorized.js'
import AdminWharehouse from '../../Components/page admin/AdminWharehouse/AdminWharehouse.js'
import AdminUserOfBdd from '../../Components/page admin/AdminUserOfBdd/AdminUserOfBdd.js'


export default function Admin() {


    return (
        <>
            <Authorized />

            <div className="admin">
            <AdminWharehouse />

            <AdminUserOfBdd />
            </div>
        </>
    )
}

