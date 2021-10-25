import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allCustomers } from '../../redux/actions/customerActions'
import '../../asset/cssCommun/composants_page_admin.css'

import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin


//Composant pour affichage et suppression des clients prenant en paramètre les states du store et le dispatch des actions
export default function AdminCustomer() {    
    
    //je pointe les states de mon store avec useSelector 
    const isLoading = useSelector(state => state.customerReducer.isLoading)
    const customers = useSelector(state => state.customerReducer.customers)
    const err = useSelector(state => state.customerReducer.error)

    //j'initialise mes states pour les eventuels messages erreur et réponse pour modif et suppression + taille fenêtre
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)

    //j'initialise mon dispatch d'actions
    const dispatch = useDispatch()

    //suppression d'un entrepôt
    const deleteCustomer = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteCustomer/${id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
                dispatch(allCustomers())
            }
        })
        .catch((error) => {
            console.log("err del", error)
            setErrResponse("Impossible de supprimer le client, recommencez ou vérifier s'il n'est pas en lien avec un entrepôt ou rdv")
        }) 
    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allCustomers())  
        
        //je vérifie la taille de l'écran pour affichage au conditionnel
        const ChangeWidth = () => {
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', ChangeWidth)

        return () => {
            window.removeEventListener('resize', ChangeWidth)
        }
    
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
                        {width > 849 && <th className="admin-comp-table-th">nb rdv/heure</th>}
                        {width > 849 && <th className="admin-comp-table-th">nb jours/semaine</th>}
                        {width > 849 && <th className="admin-comp-table-th">entrepôt</th>}
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
                                <td className="admin-comp-table-td td-upper">{customer.city}</td>
                                {width > 849 && <td className="admin-comp-table-td td-upper">{customer.rowsPerHour}</td>}
                                {width > 849 && <td className="admin-comp-table-td td-upper">{customer.numberOfDays}</td>}
                                {width > 849 && <td className="admin-comp-table-td td-upper">{customer.Wharehouse.name}</td>}
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