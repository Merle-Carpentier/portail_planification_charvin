import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allWharehouses } from '../../redux/actions/wharehouseActions'
import { logoutUser } from '../../redux/actions/userActions'
import '../../asset/cssCommun/composants_page_admin.css'

import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin


//Composant pour affichage et suppression des entrepôts prenant en paramètre les states du store et le dispatch des actions
export default function AdminWharehouse() {    
    
    //je pointe les states de mon store avec useSelector
    const isLoading = useSelector(state => state.wharehouseReducer.isLoading)
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses)
    const err = useSelector(state => state.wharehouseReducer.error)

    //j'initialise mes states pour les eventuels messages erreur et réponse pour modif et suppression + taille fenêtre
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)

    //j'initialise mon dispatch d'actions
    const dispatch = useDispatch()
    
    //suppression d'un entrepôt
    const deleteWharehouse = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteWharehouse/${id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
                dispatch(allWharehouses())
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log("err del", error)
            setErrResponse("Impossible de supprimer l'entrepôt, veuillez vérifier s'il n'est pas en lien avec un client ou un rdv")
        })
  
    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allWharehouses())    
    }, [])


    //affichage du tableau en fonction de l'état des state du store + des states créées
    return (
        
        <div className="admin-comp">

            {/*titre du tableau avec le bouton de renvoi vers l'ajout d'un entrepot */}
            <div className="admin-comp-head">
                <h2 className="admin-comp-title">entrepôts</h2>
                <button className="admin-comp-btn-add">
                    <Link className="admin-comp-link" to='/admin/wharehouse/add'>
                        <i className="fas fa-plus-circle"> Ajouter</i>
                    </Link>
                </button>
            </div>
            
            {/*tableau créé avec l'appel à l'api */}
            <table className="admin-comp-table">

                <thead className="admin-comp-table-head">
                    <tr className="admin-comp-table-trth">
                        <th className="admin-comp-table-th">nom</th>
                        <th className="admin-comp-table-th">adresse</th>
                        <th className="admin-comp-table-th">cp</th>
                        <th className="admin-comp-table-th">ville</th>
                        <th className="admin-comp-table-th">action</th>
                    </tr>
                </thead>

                {<tbody className="admin-comp-table-body">
                    {/*rendu conditionnel en fonction des 3 states du store suite au dispatch de l'action d'appel à l'api */}
                    {isLoading ? (
                        <tr className="admin-comp-table-trload">
                            <td colSpan="3" className="admin-comp-table-tdload">Chargement...</td>
                        </tr>
                    )
                    :err ? (
                        <tr className="admin-comp-table-trerr">
                            <td colSpan="3" className="admin-comp-table-tderr">{err}</td>
                        </tr>
                    ) 
                    :wharehouses.length === 0 ? (
                        <tr className="admin-comp-table-trload">
                            <td colSpan="3" className="admin-comp-table-tdload">aucun entrepôt enregistré</td>
                        </tr>
                    )
                    :wharehouses.map((wharehouse)=> {
                        {/*je map sur les données renvoyées par l'api */}
                        return(
                            <tr key={wharehouse.id} className="admin-comp-table-tr">
                                <td className="admin-comp-table-td">
                                    <Link className="admin-comp-table-link" to={`/admin/wharehouse/edit/${wharehouse.id}`}>{wharehouse.name}</Link>
                                </td>
                                <td className="admin-comp-table-td">{wharehouse.address}</td>
                                <td className="admin-comp-table-td">{wharehouse.zip}</td>
                                <td className="admin-comp-table-td td-upper">{wharehouse.city}</td>
                                <td className="admin-comp-table-td-action">
                                    <button className="admin-comp-btn-mod">
                                        <Link className="admin-comp-link" to={`/admin/wharehouse/modif/${wharehouse.id}`}>
                                            <i className="fas fa-pen"><p className="admin-comp-table-p"> modifier</p></i>
                                        </Link>                                          
                                    </button>
                                    <button
                                    className="admin-comp-btn-supp"
                                    onClick = {(e) => {
                                        e.preventDefault()
                                        deleteWharehouse(wharehouse.id)}}>
                                        <i className="fas fa-trash-alt"><p className="admin-comp-table-p"> supprimer</p></i>
                                    </button>
                                </td>
                            </tr> 
                                    
                        )
                    })}
                </tbody> }
                
            </table>

            {/*messages d'information si l'appel api est ok ou non */}
            {successResponse !== null &&
                <p className="admin-comp-successmessage">{successResponse}</p>
            }
            {errResponse !== null &&
                <p className="admin-comp-errmessage">{errResponse}</p>
            }
        </div>
    )
}

