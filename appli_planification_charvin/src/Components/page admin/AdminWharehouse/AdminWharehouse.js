import { useEffect, useState } from 'react'
import { Link , Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allWharehouses } from '../../../redux/actions/wharehouseActions'
import './AdminWharehouse.css'

import axios from 'axios'
import { configApi } from '../../../apiCalls/configApi'
const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')


//Composant pour affichage et suppression des entrepôts prenant en paramètre les states du store et le dispatch des actions
export default function AdminWharehouse() {    
    
    //je pointe les states de mon store avec useSelector
    const isLoading = useSelector(state => state.wharehouseReducer.isLoading)
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses)
    const error = useSelector(state => state.wharehouseReducer.error)

    //j'initialise mes states
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)

    //j'initialise uns const pour dispatcher mes actions au store
    const dispatch = useDispatch()

    //suppression d'un entrepôt
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

        dispatch(allWharehouses())
    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allWharehouses())     
    }, [])


    //affichage du tableau en fonction de l'état des state du store + des states créées
    return (
        
        <div className="admin-wharehouse">

            {/*titre du tableau avec le bouton de renvoi vers l'ajout d'un entrepot */}
            <div className="admin-wharehouse-head">
                <h2 className="admin-wharehouse-title">entrepôts</h2>
                <button
                className="admin-wharehouse-btn-add"
                onClick = {() => {<Redirect to='/admin/wharehouse/add' />}}>
                    <i className="fas fa-plus-circle"> Ajouter</i>
                </button>
            </div>
            
            {/*tableau créé avec l'appel à l'api */}
            <table className="admin-wharehouse-table">

                <thead className="admin-wharehouse-table-head">
                    <th className="admin-wharehouse-table-th">nom</th>
                    <th className="admin-wharehouse-table-th">adresse</th>
                    <th className="admin-wharehouse-table-th">cp</th>
                    <th className="admin-wharehouse-table-th">ville</th>
                    <th className="admin-wharehouse-table-th">action</th>
                </thead>

                {<tbody className="admin-wharehouse-table-body">
                    {/*rendu conditionnel en fonction des 3 states du store suite au dispatch de l'action d'appel à l'api */}
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
                            {/*je map sur les données renvoyées par l'api */}
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
                                            className="admin-wharehouse-btn-mod"
                                            onClick = {() => {
                                                <Redirect to='/admin/wharehouse/modif' />}}>
                                                <i className="fas fa-pen"><p className="admin-wharehouse-table-p"> modifier</p></i>
                                            </button>
                                            <button
                                            className="admin-wharehouse-btn-supp"
                                            onClick = {(e) => {
                                                e.preventDefault()
                                                deleteWharehouse(wharehouse.id)}}>
                                                <i className="fas fa-trash-alt"><p className="admin-wharehouse-table-p"> supprimer</p></i>
                                            </button>
                                        </td>
                                    </tr> 
                                    
                            )
                        })}
                </tbody> }
                
            </table>

            {/*messages d'information si l'appel api est ok ou non */}
            {successResponse !== null &&
                <p className="admin-wharehouse-successmessage">{successResponse}</p>
            }
            {errResponse !== null &&
                <p className="admin-wharehouse-errmessage">{errResponse}</p>
            }
        </div>
    )
}

