import { useState, useEffect, Component } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Authorized from '../../Components/Authorized/Authorized'
import { logoutUser } from '../../redux/actions/userActions'
import moment from 'moment'
//import 'moment/locale/fr'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import ModalEvent from '../../Components/ModalEvent/ModalEvent'
import "react-big-calendar/lib/css/react-big-calendar.css"
import './Booking.css'


const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin

let now = new Date()

moment.locale('fr')
const localizer = momentLocalizer(moment)

//modifications des messages de la toolbar du calendrier
const messages = {
    allDay: 'journée',
    previous: '<',
    next: '>',
    today: 'aujourd\'hui',
    month: 'mois',
    week: 'semaine',
    day: 'jour',
    agenda: 'Agenda',
    date: 'date',
    time: 'heure',
    event: 'événement', 
    showMore: total => `+ ${total} événement(s) supplémentaire(s)`
}

//modification des formats d'heures du calendrier => à revoir
let formats = {
    timeGutterFormat: 'H:mm',
    agendaTimeFormat: 'H:mm',
    DayFormat: (date, culture, local) => (
        `${local.format("D", date, culture)}`),
    agendaHeaderFormat: ({ start, end }, culture, local) => (
    `${local.format(start, "D MMMM", culture)} — ${local.format(end, "D MMMM", culture)}`),
    dayHeaderFormat: 'dddd MMMM Do',
}

//page booking concetant le calendrier de rdv
export default function Booking() {

    //je pointe les infos utilisateur de mon store et j'initialise le dispatch des actions
    const infos = useSelector(state => state.userReducer.infos)
    const dispatch = useDispatch()

    //initialisation des states
    const [redirect, setRedirect] = useState(false)
    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)
    const [events, setEvents] = useState([])                 //tableau des rdv
    const [modalIsOpen, setModalIsOpen] = useState(false)    //pour ouvrir ModalEvent, fermé par défaut
    const [isNewEvent, setIsNewEvent] = useState(false)      //pour spécifier si nouvel évènement, non par défaut
    const [modalEvent, setModalEvent] = useState({           //infos du rdv que l'on fait glisser dans ModalEvent
        title: '',
        start: null,
        end: null,
        description: '',
        id: null,
        wharehouseId: infos.wharehouseId,
        customerId: infos.customerId,
        userId: infos.id
    })
    

    //fonction de récupération des rdv qui sera mise dans le useEffect()
    const getBookingsById = () => {
        let array = []

        if(infos.role === "user") {
            axios.get(`${configApi.api_url}/api/bookingsByCustomer/${infos.customerId}`, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                //je met ma réponse dans un tableau et je transforme ensuite mes dates, je mets à jour la state events
                array.push(response.data.data)   
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
                //je met ma réponse dans un tableau et je transforme ensuite mes dates, je mets à jour la state events
                array.push(response.data.data)    
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

        array.map((item)=>{
            item.start = new Date(item.start)
            item.end = new Date(item.end)
        })
        setEvents(array)

        console.log('array', array)
        
        if(events.length === 0) {
            setMessage("Il n'y a aucun rdv de prévu pour l'instant")
        }

    }


    //fonction d'ouverture de ModalEvent
    const openModal = (event) => {
        //je vérifie si id existant si oui je récupère les states
        let id = event.id
        if(id) {
            setModalEvent({...event, id})
        }
        setModalIsOpen(true)
    }

    //fonction de fermeture de ModalEvent
    const closeModal = () => {
        setModalIsOpen(false)
    }

    //sélection d'une plage horaire vide
    const selectSlot = (event) => {
        setModalEvent({isNewEvent: true})
        //je sélectionne les heures début et fin
        event.start = event.slots[0]
        event.end = event.slots[event.slots.length - 1]
        openModal(event)
    }

    //sélection d'un rdv existant
    const selectEvent = (event) => {
        setIsNewEvent(false)
        openModal(event)
    }


    //fonction d'édition du rdv
    const handleModalEventEdit = (key, newValue) => {
        const newData = { ...modalEvent }
        newData[key] = newValue
        setModalEvent(newData)
    }

    //fonction de sauvegarde d'un rdv ================> ici, dans la condition, mon post et mon put de sauvegarde en bdd
    const handleEventSave = (newEvent) => {
        //j'initialise mon objet datas pour envoyer dans bdd
        let datas 

        //je cherche si id existant avec findIndex=> si je trouve l'id du rdv, je le remplace (put) sinon je l'ajoute (post)
        const index = events.findIndex(event => event.id === newEvent.id)
        if(index !== -1) {
            datas = {
                start: newEvent.start.getFullYear()+'-'+(newEvent.start.getMonth() + 1)+"-"+newEvent.start.getDate()+' '+newEvent.start.getHours()+':'+newEvent.start.getMinutes(),
                end: newEvent.end.getFullYear()+'-'+(newEvent.end.getMonth() + 1)+"-"+newEvent.end.getDate()+' '+newEvent.end.getHours()+':'+newEvent.end.getMinutes(),
                title: newEvent.title,
                description: newEvent.description,
                customerId: newEvent.customerId,
                wharehouseId: newEvent.wharehouseId,
                userId: newEvent.userId
            }
            axios.put(`${configApi.api_url}/api/updateBooking/${newEvent.id}`, datas, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                if(response.status === 200) {
                setMessage("Le rdv a bien été modifié")
                getBookingsById()
            }
            })
            .catch((error) => {
                if(error.status === 403) {
                    dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
                    return setRedirect(true)
                } else {
                    return setError("Impossible d'enregistrer le rdv, veuillez ré-essayer svp")
                }
            })
            
        } else {
            datas = {
                start: moment(newEvent.start).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(newEvent.start).format('YYYY-MM-DD HH:mm:ss'),
                title: newEvent.title,
                description: newEvent.description,
                customerId: newEvent.customerId,
                wharehouseId: newEvent.wharehouseId,
                userId: newEvent.userId
            }
            axios.post(`${configApi.api_url}/api/addBooking`, datas, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                //si la réponse est ok, je mets un message et je rappelle tous mes rdv pour mettre à jour tous les rdv
                if(response.status === 200) {
                    setMessage("Le rdv a bien été enregistré")
                    getBookingsById()
                }
            })
            .catch((error) => {
                if(error.status === 403) {
                    dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
                    return setRedirect(true)
                } else {
                    return setError("Impossible d'enregistrer le rdv, veuillez ré-essayer svp")
                }
            })
            
        }
    }

    //fonction de suppression d'un rdv ======================> ici mon delete en bdd
    const handleEventDelete = () => {
        //je cherche si id existant avec findIndex=> si je trouve l'id du rdv, je le supprime en bdd (delete)
        const index = events.findIndex(event => event.id === modalEvent.id)
            if(index !== -1) {
                axios.delete(`${configApi.api_url}/api/deleteBooking/${modalEvent.id}`, {headers: {"x-access-token": token, "userId": userId}})
                .then((response) => {
                    if(response.status === 200) {
                        setMessage("Le rdv a bien été enregistré")
                        getBookingsById()
                    }
                })
                .catch((error) => {
                    if(error.status === 403) {
                        dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
                        return setRedirect(true)
                    } else {
                        return setError("Impossible d'enregistrer le rdv, veuillez ré-essayer svp")
                    }
                })    
            } else {
                setError("Impossible de trouver le rdv, veuillez ré-essayer")
            }
        
        
        
    }

    //au chargement du composant, je récupère le tableau de mes rdv par id client si l'utilisateur a le role user ou par id entrepôt si utilisateur est charvin ou admin
    useEffect(() => {
        if(infos===null) {
           return setRedirect(true)
        }

        getBookingsById()

        console.log('events', events)
        
    }, [])



    return (
        <>
        {redirect && <Redirect to='/'/>}
        <Authorized />

        <div className="booking">
            <h1 className="booking-title">calendrier des rdv actuellement planifiés</h1>

            {message!==null && <p className="booking-p-message-chargement">{message}</p>}
            {error!==null &&<p className="booking-p-error">{error}</p>}

            <Calendar
                culture="fr"
                localizer={localizer}
                formats={formats}
                messages={messages}
                events={events}
                defaultView="week"
                views={["week", "day", "agenda"]}
                defaultDate={now}                                      //aujourd'hui
                min={moment('07:00', 'H:mma').toDate()}                //heure début
                max={moment('17:00', 'H:mma').toDate()}                //heure fin
                selectable={true}                                      //plage cliquable
                onSelectEvent={selectEvent}                            //fonction si selection d'un rdv
                onSelectSlot={selectSlot}                              //fonction si selection plage
                popup={true}
                tooltipAccessor={(e)=> e.title}   
            />

            <ModalEvent
                modalIsOpen={modalIsOpen}
                closeModal={closeModal}
                handleModalEventEdit={handleModalEventEdit}
                modalEvent={modalEvent}
                handleEventSave={handleEventSave}
                handleEventDelete={handleEventDelete}
                isNewEvent={isNewEvent}
                key={modalEvent.id}
            />

        </div>
        </>
    )
}
