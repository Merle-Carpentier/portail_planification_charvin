import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allCustomers } from '../../redux/actions/customerActions'
import '../../asset/cssCommun/composants_page_admin.css'

import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')


//Composant pour affichage et suppression des clients prenant en paramètre les states du store et le dispatch des actions
export default function AdminCustomer() {    
    
    //je pointe les states de mon store avec useSelector
    const isLoading = useSelector(state => state.customerReducer.isLoading)
    const customers = useSelector(state => state.customerReducer.customers)
    const err = useSelector(state => state.customerReducer.error)

    //j'initialise mes states
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)

    //j'initialise uns const pour dispatcher mes actions au store
    const dispatch = useDispatch()

    //suppression d'un entrepôt
    const deleteCustomer = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteCustomer/${id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
            }
        })
        .catch((error) => {
            console.log("err del", error)
            setErrResponse("Impossible de supprimer le client, recommencez ou vérifier s'il n'est pas en lien avec un entrepôt ou rdv")
        })

        dispatch(allCustomers())
    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allCustomers())     
    }, [])


    //affichage du tableau en fonction de l'état des state du store + des states créées
    return (
        
        <div className="admin-comp">

            {/*titre du tableau avec le bouton de renvoi vers l'ajout d'un entrepot */}
            <div className="admin-comp-head">
                <h2 className="admin-comp-title">clients</h2>
                <button className="admin-comp-btn-add">
                    <Link className="admin-comp-link" to='/admin/customer/add'>
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
                        <th className="admin-comp-table-th">CP</th>
                        <th className="admin-comp-table-th">ville</th>
                        <th className="admin-comp-table-th">entrepôt</th>
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
                    :customers.length === 0 ? (
                        <tr className="admin-comp-table-trload">
                            <td colSpan="3" className="admin-comp-table-tdload">aucun client enregistré</td>
                        </tr>
                    )
                    :customers.map((customer)=> {
                        {/*je map sur les données renvoyées par l'api */}
                        return(
                            <tr key={customer.id} className="admin-comp-table-tr">
                                <td className="admin-comp-table-td">
                                    <Link className="admin-comp-table-link" to={`/admin/customer/edit/${customer.id}`}>{customer.name}</Link>
                                </td>
                                <td className="admin-comp-table-td">{customer.address}</td>
                                <td className="admin-comp-table-td">{customer.zip}</td>
                                <td className="admin-comp-table-td">{customer.city}</td>
                                <td className="admin-comp-table-td">{customer.Wharehouse.name}</td>
                                <td className="admin-comp-table-td-action">
                                    <button className="admin-comp-btn-mod">
                                        <Link className="admin-comp-link" to={`/admin/customer/modif/${customer.id}`}>
                                            <i className="fas fa-pen"><p className="admin-comp-table-p"> modifier</p></i>
                                        </Link>                                          
                                    </button>
                                    <button
                                    className="admin-comp-btn-supp"
                                    onClick = {(e) => {
                                        e.preventDefault()
                                        deleteCustomer(customer.id)}}>
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