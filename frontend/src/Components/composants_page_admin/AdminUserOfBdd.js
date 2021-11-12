import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allUsersBdd } from '../../redux/actions/userOfBddActions'
import { logoutUser } from '../../redux/actions/userActions'
import '../../asset/cssCommun/composants_page_admin.css'

import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = localStorage.rdvCharvin

//Composant pour affichage et suppression des utilisateurs prenant en paramètre les states du store et le dispatch des actions
export default function AdminUserOfBdd() {    
    
    //je pointe les states de mon store avec useSelector
    const isLoading = useSelector(state => state.userOfBddReducer.isLoading)
    const usersBdd = useSelector(state => state.userOfBddReducer.usersBdd)
    const err = useSelector(state => state.userOfBddReducer.error)

    //j'initialise mes states pour les eventuels messages erreur et succès pour modif et suppression + taille fenêtre
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)
    const [redirectLog, setRedirectLog] = useState(false)

    //j'initialise mon dispatch d'action du store
    const dispatch = useDispatch()


    //suppression d'un entrepôt
    const deleteUserBdd = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteUser/${id}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            //console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
                dispatch(allUsersBdd())
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc direction login
                return setRedirectLog(true)
            }
            console.log("err del", error)
            setErrResponse("Impossible de supprimer l'utilisateur, recommencez ou vérifier s'il n'est pas en lien avec un rdv")
        })

    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allUsersBdd())     

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

        <>
        {redirectLog && <Redirect to='/' />}
        
        <div className="admin-comp">

            {/*titre du tableau avec le bouton de renvoi vers l'ajout d'un entrepot */}
            <div className="admin-comp-head">
                <h2 className="admin-comp-title">utilisateurs</h2>
                <button className="admin-comp-btn-add">
                    <Link className="admin-comp-link" to='/admin/userBdd/add'>
                        <i className="fas fa-plus-circle"> Ajouter</i>
                    </Link>
                </button>
            </div>
            
            {/*tableau créé avec l'appel à l'api */}
            <table className="admin-comp-table">

                <thead className="admin-comp-table-head">
                    <tr className="admin-comp-table-trth">
                        <th className="admin-comp-table-th">nom, prénom</th>
                        <th className="admin-comp-table-th">email</th>
                        <th className="admin-comp-table-th">client</th>
                        <th className="admin-comp-table-th">entrepôt</th>
                        {width > 849 && <th className="admin-comp-table-th">role</th>}
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
                    :usersBdd.length === 0 ? (
                        <tr className="admin-comp-table-trload">
                            <td colSpan="3" className="admin-comp-table-tdload">aucun utilisateur enregistré</td>
                        </tr>
                    )
                    :usersBdd.length>0 && usersBdd.map((userBdd)=> {
                        {/*je map sur les données renvoyées par l'api */}
                        return(
                            <tr key={userBdd.id} className="admin-comp-table-tr">
                                <td className="admin-comp-table-td">
                                    <Link className="admin-comp-table-link" to={`/admin/userBdd/edit/${userBdd.id}`}>{userBdd.lastName}, {userBdd.firstName}</Link>
                                </td>
                                <td className="admin-comp-table-td">{userBdd.email}</td>
                                <td className="admin-comp-table-td td-upper">{userBdd.Customer.name}</td>
                                <td className="admin-comp-table-td td-upper">{userBdd.Wharehouse.name}</td>
                                {width > 849 && <td className="admin-comp-table-td td-upper">{userBdd.role}</td>}
                                <td className="admin-comp-table-td-action">
                                    <button className="admin-comp-btn-mod">
                                        <Link className="admin-comp-link" to={`/admin/userBdd/modif/${userBdd.id}`}>
                                            <i className="fas fa-pen"><p className="admin-comp-table-p"> modifier</p></i>
                                        </Link>                                          
                                    </button>
                                    <button
                                    className="admin-comp-btn-supp"
                                    onClick = {(e) => {
                                        e.preventDefault()
                                        deleteUserBdd(userBdd.id)}}>
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
        </>
    )
}