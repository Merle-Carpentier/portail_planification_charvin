import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ReactAgenda , guid ,  Modal } from 'react-agenda'
import ReactAgendaCtrl from '../../Components/ReactAgendaCtrl/ReactAgendaCtrl'
import moment from 'moment'
import { bookingsByWharehouse, bookingsByCustomer, addBooking, modifBooking, deleteBooking } from '../../redux/actions/bookingActions'
import { configApi } from '../../apiCalls/configApi'
import { logoutUser } from '../../redux/actions/userActions'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import 'react-agenda/build/styles.css';
import 'react-datetime/css/react-datetime.css';
import './Booking.css'

const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin

//Initialisation des couleurs pour l'agenda
let colors = {
    "color-b": "rgba(16, 68, 118, 1)",
    "color-v": "rgba(132, 255, 128, 1)",
    "color-o": "rgba(234, 103, 23, 0.4)"
}

//initialisation de la date
let now = new Date()

export default function Booking(props) {
    
    //initialisation des states de l'agenda
    const [items, setItems] = useState([])                  //rdv
    const [selected, setSelected] = useState()              //heure créneau
    const [cellHeight, setCellHeight] = useState(30)       //taille cellules
    const [showModal, setShowModal] = useState(false)      //affichage ou non popUp
    const [locale, setLocale] = useState("fr")             //fuseau horaire
    const [rowsPerHour, setRowsPerHour] = useState(3)       //nombre de cellule par heure (récupération dans le store customersi utilisateur=user)
    const [numberOfDays, setNumberOfDays] = useState(5)    //nombre de jour (récupération dans le store customer si utilisateur=user)
    const [startDate, setStartDate] = useState(new Date()) //date de départ (actuelle)
    
    const [error, setError] = useState(null)               //affichage des messages d'erreurs

    //Je récupère mes infos utilisateur dans le store
    const infos = useSelector(state => state.userReducer.infos)
    //je récupère mon tableau de rdv dans le store
    const bookingsById = useSelector(state => state.bookingReducer.bookingsById)
    //j'initialise mon dispatch d'actions
    const dispatch = useDispatch()

    //je crée un tableau de récupération de rdv selon les requêtes
    //let bookings = []

    /////////////////////////////////////  FONCTIONS POUR L'AGENDA /////////////////////////////////////////////////
    
    ////////////////////////////////// AJOUTER UN RDV /////////////////////////////////////////////
    //fonction: j'ouvre une popup pour ajouter un rdv quand un horaire selectionné
    const handleCellSelection = (item) => {
        console.log('handleCellSelection item', item)
        setSelected(item)
        setShowModal(true)
        console.log('selected', selected)
    }

    //fonction: j'ouvre une popup pour ajouter un rdv quand selection plage horaire
    const handleRangeSelection = (item) => {
        console.log('handleRangeSelection', item) //heures début et fin
        setSelected(item)
        setShowModal(true)  
    }

    //fonction d'ajout d'un rdv
    const addNewEvent = (items, newItem) =>{
        console.log('addNewEvent items', items)
        console.log('addNewEvent newItem', newItem)
        
        //datas du rdv pour envoyer dans bdd
        const datas = {
            startDateTime: moment(newItem.selected).format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: moment(newItem.selected).add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
            natureBooking: newItem.natureBooking,
            classColor: newItem.classColor,
            name: newItem.name,
            refNumber: newItem.refNumber,
            paletsQuantity: newItem.paletsQuantity,
            carrierSuppier: newItem.carrierSuppier,
            customerId: infos.customerId,
            wharehouseId: infos.wharehouseId,
            userId: infos.id,
            _id: guid()
        }
        //envoi bdd
        axios.post(`${configApi.api_url}/api/addBooking`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep addNewEvent', response)
            if(response.status === 200){
                dispatch(addBooking(datas))
                setItems(items)
            }
            setShowModal(false)
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('err handleItemRemove', error)
            setError("impossible d'enregistrer le rdv, veuillez recommencer ou contacter Charvin")
        })
    }
    
    /////////////////////////////// AFFICHER ET MODIFIER UN RDV ////////////////////////////////////////////
    //fonction: j'ouvre la popup du rdv pour éventuellement le modifier
    const handleItemEdit = (item, newItem) =>{
        console.log('handleItemEdit item', item)
        console.log('handleItemEdit newItem', newItem)
        //mise à jour de la state selected et showModal
        setSelected(item);
        setShowModal(true)
            
    }

    //fonction mise à jour du rdv
    const editEvent = (item, newItem)=> {
        console.log('ModifEvent item', item)
        console.log('ModifEvent newItem', newItem)

        //datas du rdv pour envoyer dans bdd
        const datas = {
            startDateTime: moment(newItem.selected).format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: moment(newItem.selected).format('YYYY-MM-DD HH:mm:ss'),
            natureBooking: newItem.natureBooking,
            classColor: newItem.classColor,
            name: newItem.name,
            refNumber: newItem.refNumber,
            paletsQuantity: newItem.paletsQuantity,
            carrierSuppier: newItem.carrierSuppier,
            customerId: infos.customerId,
            wharehouseId: infos.wharehouseId,
            userId: infos.id,
            _id: item._id
        }

        //envoi bdd
        axios.put(`${configApi.api_url}/api/updateBooking${newItem._id}`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep addNewEvent', response)
            if(response.status === 200){
                dispatch(modifBooking(datas))
                setItems(bookingsById)
            }
            setShowModal(false)
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('err handleItemRemove', error)
            setError("impossible de modifier le rdv, veuillez recommencer ou contacter Charvin")
        })
    }

    ////////////////////////////// SUPPRIMER UN RDV //////////////////////////////////////
    //fonction: je supprime le rdv
    const handleItemRemove = (items, deleteItem) => {
        console.log('handleItemRemove items', items)
        console.log('handleItemRemove deleteItem', deleteItem)

        //appel api pour supprimer un rdv
        axios.delete(`${configApi.api_url}/api/deleteBooking/${deleteItem._id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep handleItemRemove')
            if(response.status === 200){
                dispatch(deleteBooking(deleteItem._id))
                setItems(items)
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('err handleItemRemove', error)
            setError("impossible de supprimer le rdv, veuillez recommencer ou contacter Charvin")
        })
    }


    ////////////////////////////// FONCTION POUR LE USE EFFECT ///////////////////////////////////////
    
    //choix de la requête d'affichage des rdv en fonction de l'utilisateur
    const getBookingsById = () => {
        if(infos.role === "admin" || infos.role === "charvin") {
            dispatch(bookingsByWharehouse(infos.wharehouseId))
        }else {
            dispatch(bookingsByCustomer(infos.customerId))
            //récupération des infos client par l'id pour obtenir rowsPerHour et numberOfDays
            axios.get(`${configApi.api_url}/api/detaiCustomer/${infos.customerId}`, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                console.log('rep detail customer ds bookingbycust', response)
                setRowsPerHour(response.data.data.rowsPerHour)
                setNumberOfDays(response.data.data.numberOfDays)
            })
        }
        bookingsById.map((book) => {
            book.startDateTime = new Date(book.startDateTime)
            book.endDateTime = new Date(book.endDateTime)
        })
        //mise à jour de la state avec les bonnes heures
        setItems(bookingsById)
    }
    
    

    useEffect(() => {
        console.log('user', infos)
        console.log('props', props)
        console.log('reactAgendaCtrl', ReactAgendaCtrl)

        //getBookingsById()
        
    }, [])

    return (
        <>
            <Authorized />
            <div className="booking">
                <h1 className="booking-title">planning charvin</h1>

                {error !== null && <p className="booking-p-error">{error}</p>}

                {showModal &&
                    <Modal clickOutside={()=>setShowModal(false)} >

                        <div className="modal-content">

                        <ReactAgendaCtrl
                            items={items}
                            itemColors={colors}
                            selected={selected}
                            Addnew={addNewEvent}
                            edit={editEvent}  
                        
                        />

                          {/* <ReactAgendaCtrl
                            items={items}
                            //selected={selected}
                            itemColors={colors}
                            selectedCells={selected}
                            Addnew={addNewEvent}
                            edit={editEvent}  
                            
                            /> */}
                        </div>

                    </Modal>
                }

            <ReactAgenda
                minDate={now}
                maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
                disablePrevButton={false}
                startDate={startDate}
                cellHeight={cellHeight}
                startAtTime={8}
                endAtTime={17}
                locale={locale}
                items={items}
                numberOfDays={numberOfDays}
                rowsPerHour={rowsPerHour}
                //itemComponent={itemAgenda}
                itemColors={colors}
                autoScale={false}
                fixedHeader={true}
                onItemEdit={() => handleItemEdit}
                onItemRemove={handleItemRemove}
                onCellSelect={handleCellSelection}
                onRangeSelection={handleRangeSelection}
            />

            </div>
        </>
    )
}
