import { useEffect } from 'react'
import { Link , Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteWharehouse } from '../../../apiCalls/wharehousesCalls'
import { allWharehouses } from '../../../redux/actions/wharehouseActions'
import './AdminWharehouse.css'


//Composant pour affichage et suppression des entrepôts prenant en paramètre les states du store et le dispatch des actions
function AdminWharehouse({ wharehouseData, callWharehouses }) {    
    
    const delWharehouse = (id) => {
        deleteWharehouse(id)
    }

    //appel à l'api au montage et à chaque modification
    useEffect(() => {
        callWharehouses()

        console.log("store wharehouse", wharehouseData)
    }, [callWharehouses])


    //affichage du tableau en fonction de l'état des state du store
    return (

        <div className="admin-wharehouse">
            <div className="admin-wharehouse-head">
                <h2 className="admin-wharehouse-title">entrepôts</h2>
                <button
                onClick = {() => {<Redirect to='/admin/wharehouse/add' />}}>
                    <i class="fas fa-plus-circle">Ajouter</i>
                </button>
            </div>
            
            <table className="admin-wharehouse-table">

                <thead className="admin-wharehouse-table-head">
                    <th className="admin-wharehouse-table-th">nom</th>
                    <th className="admin-wharehouse-table-th">adresse</th>
                    <th className="admin-wharehouse-table-th">code postal</th>
                    <th className="admin-wharehouse-table-th">ville</th>
                    <th colspan="2" className="admin-wharehouse-table-th">action</th>
                </thead>

                {/*<tbody className="admin-wharehouse-table-body">
                    {wharehouseData.isLoading ? (
                        <tr className="admin-wharehouse-table-trload">
                            <td className="admin-wharehouse-table-load">Chargement...</td>
                        </tr>
                    )
                    :wharehouseData.error ? (
                        <tr className="admin-wharehouse-table-trerr">
                            <td className="admin-wharehouse-table-err">{wharehouseData.error}</td>
                        </tr>
                    ) 
                    :wharehouseData.wharehouses.map((wharehouse)=> {
                        return(
                            <tr key={wharehouse.id} className="admin-wharehouse-table-tr">
                            <td className="admin-wharehouse-table-td">
                                <Link to={`admin/wharehouse/edit/${wharehouse.id}`}>{wharehouse.name}</Link>
                            </td>
                            <td className="admin-wharehouse-table-td">{wharehouse.address}</td>
                            <td className="admin-wharehouse-table-td">{wharehouse.zip}</td>
                            <td className="admin-wharehouse-table-td">{wharehouse.city}</td>
                            <td className="admin-wharehouse-table-td">
                                <button
                                onClick = {() => {<Redirect to='/admin/wharehouse/modif' />}}>modifier
                                </button>
                            </td>
                            <td className="admin-wharehouse-table-td">
                                <button
                                onClick = {(e) => {
                                    e.preventDefault()
                                    delWharehouse(wharehouse.id)}}>
                                    <i class="fa-solid fa-trash-can">supprimer</i>
                                </button>
                            </td>
                            </tr> 
                        )
                    })}

                </tbody> */}
                
            </table>
        </div>
    )
}


//j'envoie mes states en props dans le store (useSelector)
const mapStateToProps = state => {
    return {
        wharehouseData: state.wharehouse //wharehouse=clé dans le store
    }
}

//je dispatche mes actions dans le store (useDispatch)
const mapDispatchToProps = dispatch => {
    return {
        callWharehouses: () => dispatch(allWharehouses())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminWharehouse)
