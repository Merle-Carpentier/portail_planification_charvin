import { useEffect, useState } from 'react'
import { Link , Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//import { deleteWharehouse } from '../../../apiCalls/wharehousesCalls'
import { allWharehouses } from '../../../redux/actions/wharehouseActions'
import './AdminWharehouse.css'

import axios from 'axios'
import { configApi } from '../../../apiCalls/configApi'
const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')




//Composant pour affichage et suppression des entrepôts prenant en paramètre les states du store et le dispatch des actions
export default function AdminWharehouse() {    
    
    const isLoading = useSelector(state => state.wharehouseReducer.isLoading)
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses)
    const error = useSelector(state => state.wharehouseReducer.error)

    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)

    const dispatch = useDispatch()

    
    const deleteWharehouse = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteWharehouse/${id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
            }
        })
        .catch((error) => {
            console.log("err del", error)
            setErrResponse("impossible de supprimer l'entrepôt, veuillez vérifier s'il n'est pas en lien avec un client ou un rdv")
        })

        allWharehouses()
    }
        
    

    //appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allWharehouses())     
    }, [])


    //affichage du tableau en fonction de l'état des state du store
    return (
        
        <div className="admin-wharehouse">
        {/* {console.log("wharehouses", wharehouses)}
        {console.log("isLoading", isLoading)}
        {console.log("error", error)} */}
            <div className="admin-wharehouse-head">
                <h2 className="admin-wharehouse-title">entrepôts</h2>
                <button
                className="admin-wharehouse-btn-addmod"
                onClick = {() => {<Redirect to='/admin/wharehouse/add' />}}>
                    <i className="fas fa-plus-circle"> Ajouter</i>
                </button>
            </div>
            
            <table className="admin-wharehouse-table">

                <thead className="admin-wharehouse-table-head">
                    <th className="admin-wharehouse-table-th">nom</th>
                    <th className="admin-wharehouse-table-th">adresse</th>
                    <th className="admin-wharehouse-table-th">cp</th>
                    <th className="admin-wharehouse-table-th">ville</th>
                    <th className="admin-wharehouse-table-th">action</th>
                </thead>

                {<tbody className="admin-wharehouse-table-body">
                    {isLoading ? (
                        <tr className="admin-wharehouse-table-trload">
                            <td colSpan="3" className="admin-wharehouse-table-tdload">Chargement...</td>
                        </tr>
                    )
                    :error ? (
                        <tr className="admin-wharehouse-table-trerr">
                            <td colSpan="3" className="admin-wharehouse-table-tderr">{error}</td>
                        </tr>
                    ) 
                    :wharehouses.length === 0 ? (
                        <tr className="admin-wharehouse-table-trload">
                            <td colSpan="3" className="admin-wharehouse-table-tdload">aucun entrepôt enregistré</td>
                        </tr>
                    )
                    :wharehouses.length > 0 && 
                        wharehouses.map((wharehouse)=> {
                            return(
                                    <tr key={wharehouse.id} className="admin-wharehouse-table-tr">
                                        <td className="admin-wharehouse-table-td">
                                            <Link className="admin-wharehouse-table-link" to={`admin/wharehouse/edit/${wharehouse.id}`}>{wharehouse.name}</Link>
                                        </td>
                                        <td className="admin-wharehouse-table-td">{wharehouse.address}</td>
                                        <td className="admin-wharehouse-table-td">{wharehouse.zip}</td>
                                        <td className="admin-wharehouse-table-td">{wharehouse.city}</td>
                                        <td className="admin-wharehouse-table-td-action">
                                            <button
                                            className="admin-wharehouse-btn-addmod"
                                            onClick = {() => {
                                                <Redirect to='/admin/wharehouse/modif' />}}>
                                                <i class="fas fa-pen"></i>
                                            </button>
                                            <button
                                            className="admin-wharehouse-btn-supp"
                                            onClick = {(e) => {
                                                e.preventDefault()
                                                deleteWharehouse(wharehouse.id)}}>
                                                <i class="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr> 
                                    
                            )
                        })}
                </tbody> }
                
            </table>
            {successResponse !== null &&
                <p className="admin-wharehouse-successmessage">{successResponse}</p>
            }
            {errResponse !== null &&
                <p className="admin-wharehouse-errmessage">{errResponse}</p>
            }
        </div>
    )
}

