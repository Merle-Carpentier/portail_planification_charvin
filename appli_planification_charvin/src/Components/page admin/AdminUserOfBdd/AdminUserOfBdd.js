import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { allUsersBdd } from '../../../redux/actions/userOfBddActions'
import './AdminUserOfBdd.css'

import axios from 'axios'
import { configApi } from '../../../apiCalls/configApi'
const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')


//Composant pour affichage et suppression des entrepôts prenant en paramètre les states du store et le dispatch des actions
export default function AdminUserOfBdd() {    
    
    //je pointe les states de mon store avec useSelector
    const isLoading = useSelector(state => state.userOfBddReducer.isLoading)
    const usersBdd = useSelector(state => state.userOfBddReducer.usersBdd)
    const err = useSelector(state => state.userOfBddReducer.error)

    //j'initialise mes states
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)

    //j'initialise uns const pour dispatcher mes actions au store
    const dispatch = useDispatch()

    //suppression d'un entrepôt
    const deleteUserBdd = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteUser/${id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
            }
        })
        .catch((error) => {
            console.log("err del", error)
            setErrResponse("Impossible de supprimer l'utilisateur, recommencez ou vérifier s'il n'est pas en lien avec un rdv")
        })

        dispatch(allUsersBdd())
    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allUsersBdd())     
    }, [])


    //affichage du tableau en fonction de l'état des state du store + des states créées
    return (
        
        <div className="admin-userBdd">

            {/*titre du tableau avec le bouton de renvoi vers l'ajout d'un entrepot */}
            <div className="admin-userBdd-head">
                <h2 className="admin-userBdd-title">utilisateurs</h2>
                <button className="admin-userBdd-btn-add">
                    <Link className="admin-userBdd-link" to='/admin/userBdd/add'>
                        <i className="fas fa-plus-circle"> Ajouter</i>
                    </Link>
                </button>
            </div>
            
            {/*tableau créé avec l'appel à l'api */}
            <table className="admin-userBdd-table">

                <thead className="admin-userBdd-table-head">
                    <tr className="admin-userBddtable-trth">
                        <th className="admin-userBdd-table-th">nom, prénom</th>
                        <th className="admin-userBddtable-th">email</th>
                        <th className="admin-userBdd-table-th">client</th>
                        <th className="admin-userBdd-table-th">entrepôt</th>
                        <th className="admin-userBdd-table-th">role</th>
                        <th className="admin-userBdd-table-th">action</th>
                    </tr>
                </thead>

                {<tbody className="admin-userBdd-table-body">
                    {/*rendu conditionnel en fonction des 3 states du store suite au dispatch de l'action d'appel à l'api */}
                    {isLoading ? (
                        <tr className="admin-userBdd-table-trload">
                            <td colSpan="3" className="admin-userBdd-table-tdload">Chargement...</td>
                        </tr>
                    )
                    :err ? (
                        <tr className="admin-userBdd-table-trerr">
                            <td colSpan="3" className="admin-userBdd-table-tderr">{err}</td>
                        </tr>
                    ) 
                    :usersBdd.length === 0 ? (
                        <tr className="admin-userBdd-table-trload">
                            <td colSpan="3" className="admin-userBdd-table-tdload">aucun utilisateur enregistré</td>
                        </tr>
                    )
                    :usersBdd.map((userBdd)=> {
                        {/*je map sur les données renvoyées par l'api */}
                        return(
                            <tr key={userBdd.id} className="admin-userBdd-table-tr">
                                <td className="admin-userBdd-table-td">
                                    <Link className="admin-userBdd-table-link" to={`/admin/userBdd/edit/${userBdd.id}`}>{userBdd.lastName}, {userBdd.firstName}</Link>
                                </td>
                                <td className="admin-userBdd-table-td">{userBdd.email}</td>
                                <td className="admin-userBdd-table-td">{userBdd.Customer.name}</td>
                                <td className="admin-userBdd-table-td">{userBdd.Wharehouse.name}</td>
                                <td className="admin-userBdd-table-td">{userBdd.role}</td>
                                <td className="admin-userBdd-table-td-action">
                                    <button className="admin-userBdd-btn-mod">
                                        <Link className="admin-userBdd-link" to={`/admin/userBdd/modif/${userBdd.id}`}>
                                            <i className="fas fa-pen"><p className="admin-userBdd-table-p"> modifier</p></i>
                                        </Link>                                          
                                    </button>
                                    <button
                                    className="admin-userBdd-btn-supp"
                                    onClick = {(e) => {
                                        e.preventDefault()
                                        deleteUserBdd(userBdd.id)}}>
                                        <i className="fas fa-trash-alt"><p className="admin-userBdd-table-p"> supprimer</p></i>
                                    </button>
                                </td>
                            </tr> 
                                    
                        )
                    })}
                </tbody> }
                
            </table>

            {/*messages d'information si l'appel api est ok ou non */}
            {successResponse !== null &&
                <p className="admin-userBdd-successmessage">{successResponse}</p>
            }
            {errResponse !== null &&
                <p className="admin-userBdd-errmessage">{errResponse}</p>
            }
        </div>
    )
}