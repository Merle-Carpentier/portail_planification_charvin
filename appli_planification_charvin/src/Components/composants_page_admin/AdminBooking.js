import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { allBookings } from '../../redux/actions/bookingActions'
import '../../asset/cssCommun/composants_page_admin.css'

import axios from 'axios'
import { configApi } from '../../apiCalls/configApi'
const token = localStorage.rdvCharvin
const userCharvin = JSON.parse(localStorage.userCharvin)
const userId = userCharvin[0].id


//Composant pour affichage et suppression des entrepôts prenant en paramètre les states du store et le dispatch des actions
export default function AdminBooking() {    
    
    //je pointe les states de mon store avec useSelector
    const isLoading = useSelector(state => state.bookingReducer.isLoading)
    const bookings = useSelector(state => state.bookingReducer.bookings)
    const err = useSelector(state => state.bookingReducer.error)

    //j'initialise mes states
    const [errResponse, setErrResponse] = useState(null)
    const [successResponse, setSuccessResponse] = useState(null)
    const [width, setWidth] = useState(window.innerWidth)

    //j'initialise mon dispatch d'action du store
    const dispatch = useDispatch()


    //suppression d'un entrepôt
    const deleteBooking = (id) => {
        axios.delete(`${configApi.api_url}/api/deleteBooking/${id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log("réponse del", response)
            if(response.status === 200) {
                setSuccessResponse(response.message)
                dispatch(allBookings())
            }
        })
        .catch((error) => {
            console.log("err del", error)
            setErrResponse("Impossible de supprimer le rdv")
        })

    }
        

    //action d'appel à l'api au montage et à chaque modification
    useEffect(() => {
        dispatch(allBookings()) 
        
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
                <h2 className="admin-comp-title">rdv programmés</h2>
                <button className="admin-comp-btn-add">
                    <Link className="admin-comp-link" to='/admin/booking/add'>
                        <i className="fas fa-plus-circle"> Ajouter</i>
                    </Link>
                </button>
            </div>
            
            {/*tableau créé avec l'appel à l'api */}
            <table className="admin-comp-table">

                <thead className="admin-comp-table-head">
                    <tr className="admin-comp-table-trth">
                        <th className="admin-comp-table-th">date / heure rdv</th>
                        <th className="admin-comp-table-th">nom</th>
                        <th className="admin-comp-table-th">nature</th>
                        {width > 849 && <th className="admin-comp-table-th">référence</th>}
                        <th className="admin-comp-table-th">nb palettes</th>
                        {width > 1100 && <th className="admin-comp-table-th">transporteur</th>}
                        {width > 849 && <th className="admin-comp-table-th">client</th>}
                        <th className="admin-comp-table-th">entrepôt</th>
                        {width > 1100 && <th className="admin-comp-table-th">utilisateur</th>}
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
                    :bookings.length === 0 ? (
                        <tr className="admin-comp-table-trload">
                            <td colSpan="3" className="admin-comp-table-tdload">aucun rdv enregistré</td>
                        </tr>
                    )
                    :bookings.map((booking)=> {
                        {/*je map sur les données renvoyées par l'api */}
                        return(
                            <tr key={booking.id} className="admin-comp-table-tr">
                                <td className="admin-comp-table-td">
                                    <Link className="admin-comp-table-link" to={`/admin/booking/edit/${booking.id}`}>{booking.bookingDate}, {booking.bookingTime}</Link>
                                </td>
                                <td className="admin-comp-table-td">{booking.bookingName}</td>
                                <td className="admin-comp-table-td td-upper">{booking.natureBooking}</td>
                                {width > 849 && <td className="admin-comp-table-td td-upper">{booking.refNumber}</td>}
                                <td className="admin-comp-table-td td-upper">{booking.paletsQuantity}</td>
                                {width > 1100 && <td className="admin-comp-table-td td-upper">{booking.carrierSupplier}</td>}
                                {width > 849 && <td className="admin-comp-table-td td-upper">{booking.Customer.name}</td>}
                                <td className="admin-comp-table-td td-upper">{booking.Wharehouse.name}</td>
                                {width > 1100 && <td className="admin-comp-table-td td-upper">{booking.User.name}</td>}
                                <td className="admin-comp-table-td-action">
                                    <button className="admin-comp-btn-mod">
                                        <Link className="admin-comp-link" to={`/admin/booking/modif/${booking.id}`}>
                                            <i className="fas fa-pen"><p className="admin-comp-table-p"> modifier</p></i>
                                        </Link>                                          
                                    </button>
                                    <button
                                    className="admin-comp-btn-supp"
                                    onClick = {(e) => {
                                        e.preventDefault()
                                        deleteBooking(booking.id)}}>
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