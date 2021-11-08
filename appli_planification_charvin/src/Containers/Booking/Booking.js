import { useState, useEffect } from 'react'
import { ReactAgenda, ReactAgendaCtrl, Modal } from 'react-agenda'  //_id généré auto par guid() de react-agenda
import moment from 'moment'
import 'react-agenda/build/styles.css'
import 'react-datetime/css/react-datetime.css'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router'
import { configApi } from '../../apiCalls/configApi'
import { logoutUser } from '../../redux/actions/userActions'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
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


//page des rdv avec react-calendar
export default function Booking() {

    //je pointe les infos utilisateur de mon store et j'initialise le dispatch des actions
    const infos = useSelector(state => state.userReducer.infos)
    const dispatch = useDispatch()

    //initialisation des states pour react-agenda
    const [items, setItems] = useState([])                                            //tableau rdv
    const [selected, setSelected] = useState([]);                                     //créneau horaire séléctionné
    const [cellHeight, setCellHeight] = useState(35)                                  //taille des cellule par défault
    const [showModal, setShowModal] = useState(false)                                 //affichage ou non popUp
    const [rowsPerHour, setRowsPerHour] = useState(2)                                 //nombre de cellule par heure (modifiable)
    const [numberOfDays, setNumberOfDays] = useState(5)                               //nombre de jours affichés
    const [startDate, setStartDate] = useState(now)                                   //date de départ (actuelle)

    //initialisation des autres states
    const [redirect, setRedirect] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)


   ////////////////////fonction de récupération des rdv qui sera mise dans le useEffect() ///////////////////////////////////////////
    const getBookingsById = () => {

        //je m'assure que j'ai bioen mes infos utilisateur sinon de redirige l'utilisateur vers la connexion
        if(infos === null) {
            return setRedirect(true)
        }

        //j'initialise un tableau pour accueillir mes rdv 
        let events = []

        //en fonction du role utilisateur, je fais mes requêtes
        if(infos.role === "user") {
            axios.get(`${configApi.api_url}/api/bookingsByCustomer/${infos.customerId}`, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                console.log('response booking by customer',response)
                if(response.data.data.length === 0) {
                    setMessage("Il n'y a aucun rdv de prévu pour l'instant")
                }
                //je transforme mes dates et je j'envoie mes rdv dans mon tableau events
                response.data.data.map((item)=>{
                    item.startDateTime = new Date(item.startDateTime)
                    item.endDateTime = new Date(item.endDateTime)
                    events.push(item)    
                })  
                //Je mets à jour ma state items
                setItems(events) 

                setError(null)

                //je récupère le nombre de cellules par heure en fonction de mon client
                axios.get(`${configApi.api_url}/api/detailCustomer/${infos.customerId}`, {headers: {"x-access-token": token, "userId": userId}})
                .then((response) => {
                    console.log('response detail customer',response)
                    setRowsPerHour(response.data.data.rowsPerHour)
                })
            })
            .catch((error) => {
                if(error.status === 403) {
                    dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
                    return setRedirect(true)
                } else {
                    return setError("Impossible de récupérer les rdv, veuillez ré-essayer svp")
                }
            })
        } else {
            axios.get(`${configApi.api_url}/api/bookingsByWharehouse/${infos.wharehouseId}`, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                console.log('response', response.data.data)
                if(response.data.data.length === 0) {
                    setMessage("Il n'y a aucun rdv de prévu pour l'instant")
                }
                //je transforme mes dates et je j'envoie mes rdv dans mon tableau events
                response.data.data.map((item)=>{
                    item.startDateTime = new Date(item.startDateTime)
                    item.endDateTime = new Date(item.endDateTime)
                    events.push(item)
                })

                //Je mets à jour ma state items
                setItems(events)

                setError(null)

                console.log('items', items)
            })
            .catch((error) => {
                if(error.status === 403) {
                    dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
                    return setRedirect(true)
                } else {
                    return setError("Impossible de récupérer les rdv, veuillez ré-essayer svp")
                }
            })
        }
        console.log('events', events)
    }

     /////////////////////////////////////  FONCTIONS POUR L'AGENDA /////////////////////////////////////////////////
    
    ////////////////////////////////// SELECTIONNER UNE PLAGE RDV /////////////////////////////////////////////
    //fonction: j'ouvre une popup pour ajouter un rdv quand une cellule selectionnée
    const handleCellSelection = (item) => {
        console.log('handleCellSelection item', item)
        let dateDeb = new Date(item)
        let dateFin = dateDeb.getTime() + 30*60000
        //setSelected([dateDeb.toISOString(), dateFin.toISOString()])

        //setSelected([dateDeb, dateFin])
        //setShowModal(true)

        

        console.log('selected',selected)

    }

    //fonction: j'ouvre une popup pour ajouter un rdv quand selection plage horaire (plusieurs cellules)
    const handleRangeSelection = (item) => {
        console.log('handleRangeSelection', item) //heures début et fin 
        setSelected(item)
        setShowModal(true)
        console.log('selected',selected)
    }

    /////////////////////////////////////// AJOUTER UN RDV /////////////////////////////////////////////////////
    //fonction d'ajout d'un rdv
    const addNewEvent = (items, newItem) =>{
        console.log('addNewEvent', items)
        console.log('addNewEvent', newItem)
        
        //création de datas pour injecter le nouveau rdv en bdd
        const datas = {
            name: newItem.name,
            startDateTime: moment(newItem.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: moment(newItem.endDateTime).format('YYYY-MM-DD HH:mm:ss'),
            classes: newItem.classes,
            _id: newItem._id,
            customerId: infos.customerId,
            wharehouseId: infos.customerId,
            userId: infos.id 
        }

        //envoi des infos dans la bdd
        axios.post(`${configApi.api_url}/api/addBooking`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep addNewEvent', response)
            if(response.status === 200) {
                setItems(items)
            }
            setShowModal(false)
        })
        .catch((error) => {
            if(error.status === 403) {
                return dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('err addNewEvent', error)
            setError("impossible d'enregistrer le rdv, veuillez recommencer ou contacter Charvin")
        })
    }


    ///////////////////////////////////////// AFFICHER ET MODIFIER UN RDV ////////////////////////////////////////////
    //fonction: j'ouvre une popup pour modifier le rdv quand selectionnée
    const handleItemEdit = (item, newItem) =>{
	    console.log('handleItemEdit', item)
	    console.log('handleItemEdit', newItem)
	    //mise à jour de la state selected et showModal
        setSelected([item]);
        setShowModal(true)
	    
	}

    //fonction de modification d'un rdv
    const editEvent = (item, newItem) =>{
        console.log('editEvent', item)               
        console.log('editEvent', newItem)
        //création de datas pour injecter le nouveau rdv en bdd
        let datas = {
              name: newItem.name,
              startDateTime: newItem.startDateTime.getFullYear()+'-'+(newItem.startDateTime.getMonth() + 1)+"-"+newItem.startDateTime.getDate()+' '+newItem.startDateTime.getHours()+':'+newItem.startDateTime.getMinutes(),
              endDateTime: newItem.endDateTime.getFullYear()+'-'+(newItem.endDateTime.getMonth() + 1)+"-"+newItem.endDateTime.getDate()+' '+newItem.endDateTime.getHours()+':'+newItem.endDateTime.getMinutes(),
              classes: newItem.classes,
        }
            
        //modif des infos dans la bdd
        axios.put(`${configApi.api_url}/api/updateBooking/${newItem._id}`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            console.log('rep editEvent', response)
            if(response.status === 200) {
                getBookingsById()
            }
            setShowModal(false)
        })
        .catch((error) => {
            if(error.status === 403) {
                return dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('err editEvent', error)
            setError("impossible de modifier le rdv, veuillez recommencer ou contacter Charvin")
        })
    }

    /////////////////////////////////////////// SUPPRIMER UN RDV //////////////////////////////////////////////
    //fonction de suppression d'un rdv
    const handleItemRemove = (items, deleteItem) => {
        console.log('handleItemRemove', items)
        console.log('handleItemRemove', deleteItem)

        //suppression dans la bdd
        axios.delete(`${configApi.api_url}/api/deleteBooking/${deleteItem._id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            console.log('rep deleteItem', response)
            if(response.status === 200) {
                setItems(items)
            }
        })
    }

    ///////////////////////////////// j'appelle ma requête au chargement de la page/////////////////////////////////
    useEffect(() => {
        
        getBookingsById()
        
    }, [])


    return (
        <>
            {redirect && <Redirect to='/' />}
            <Authorized />

            <div className="booking">

                <h1 className="booking-title">calendrier des rdv actuellement planifiés</h1>

                <p className="booking-p-infos">Avant de prendre rdv, merci de respecter les consignes suivantes:</p>
                <ul className="booking-infos-ul">
                    <li className="booking-infos-li">Ne pas modifier ni supprimer les rdv ne vous appartenant pas</li>
                    <li className="booking-infos-li">Sélectionnez une plage horaire parmi celles disponibles</li>
                    <li className="booking-infos-li">Pensez à renseigner la référence rdv ainsi que le nombre de palettes dans le même champ</li>
                    <li className="booking-infos-li">Code des couleurs: vert pour un chargement et orange pour une livraison (bleu réservé à charvin)</li>
                </ul>

                {message!==null && <p className="booking-p-message-chargement">{message}</p>}
                {error!==null &&<p className="booking-p-error">{error}</p>}   

                    {showModal &&
                        <Modal
                        clickOutside={()=>setShowModal(false)}
                        title="Remplir ref rdv + nb palettes et choisir une couleur svp"
                         >

                            <div className="modal-content">
                                <ReactAgendaCtrl
                                    items={items}
                                    itemColors={colors}
                                    selectedCells={selected}
                                    Addnew={addNewEvent}
                                    edit={editEvent}  
                                    

                                />
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
                        locale='fr'
                        items={items}
                        numberOfDays={numberOfDays}
                        rowsPerHour={rowsPerHour}
                        itemColors={colors}
                        autoScale={true}
                        fixedHeader={true}
                        onItemEdit={handleItemEdit}
                        onItemRemove={handleItemRemove}
                        onCellSelect={handleCellSelection}
                        onRangeSelection={handleRangeSelection}
                    />
                
            </div>
        </>
    )
}
