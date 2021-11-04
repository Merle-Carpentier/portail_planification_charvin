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
import events from './events'
import ModalEvent from '../../Components/ModalEvent/ModalEvent'
import "react-big-calendar/lib/css/react-big-calendar.css"
import './Booking.css'
import { bookingsByCustomer, bookingsByWharehouse, addBooking, modifBooking, deleteBooking } from '../../redux/actions/bookingActions'

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

    //je pointe les states de mon store et j'initialise le dispatch des actions
    const bookingsById = useSelector(state => state.bookingReducer.bookingsById)
    const isLoading = useSelector(state => state.bookingReducer.isLoading)
    const error = useSelector(state => state.bookingReducer.isLoading)
    const infos = useSelector(state => state.userReducer.infos)
    const dispatch = useDispatch()

    //initialisation des states
    const [redirect, setRedirect] = useState(false)
    const [events, setEvents] = useState(bookingsById)   
    const [modalIsOpen, setModalIsOpen] = useState(false)    //pour ouvrir ModalEvent, fermé par défaut
    const [isNewEvent, setIsNewEvent] = useState(false)      //pour spécifier si nouvel évènement, non par défaut
    const [modalEvent, setModalEvent] = useState({           //infos du rdv que l'on fait glisser dans ModalEvent
        title: '',
        start: null,
        end: null,
        desc: '',
        id: null,
        wharehouseId: infos.wharehouseId,
        customerId: infos.customerId,
        userId: infos.id
    })
    

    //fonction de récupération des rdv qui sera mise dans le useEffect()
    const getBookings = () => {
        if(infos.role === "user") {
            dispatch(bookingsByCustomer(infos.customerId))
        } else {
            dispatch(bookingsByWharehouse(infos.wharehouseId))
        }
        
        bookingsById.map((item)=>{
            item.start = new Date(item.start)
            item.end = new Date(item.end)
        })

    }

    //fonction pour agrandir ou rétrécir un rdv déjà existant
    const resizeEvent = ({ event, start, end }) => {
        const { events } = events      //correspond à la state initialisée (tableau rdv)

        //je cherche le rdv à modifier, si trouvé, modif des horaires si non pas de chgt
        const newEvents = events.map(existingEvent => {
            return existingEvent.id === event.id ?
            { ...existingEvent, start, end }
            : existingEvent
        })
        setEvents(newEvents)
    }

    //fonction d'ouverture de ModalEvent
    const openModal = (event) => {
        //je vérifie si id existant si non création ce jour
        const id = event.id ? event.id 
        : Date.now()                   //trouver un système d'id à incrémenter pour newEvent
        setModalIsOpen(true)
        setModalIsOpen({...event, id})
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

    


        // axios.post(`${configApi.api_url}/api/addBooking`, newEvent, {headers: {"x-access-token": token, "userId": userId}})
        // .then((response) => {
        //     if(response.status === 200) {
        //         setMessage("Le rdv a bien été rajouté")
        //     }
        // })
        // .catch((error) => {
        //     if(error.status === 403) {
        //         dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
        //     }
        //     console.log('addBooking err', error) 
        //     setErr("Impossible d'enregistrer le rdv, veuillez recommencer")
        // })



    //fonction d'édition/modif du rdv
    const handleModalEventEdit = (key, newValue) => {
        const newData = { ...modalEvent }
        newData[key] = newValue
        setModalEvent(newData)
    }

    //fonction de sauvegarde d'un rdv =============================> ici, dans la condition, mon post et mon put de sauvegarde en bdd!!!
    const handleEventSave = (newEvent) => {
        const index = events.findIndex(event => event.id === newEvent.id)
        if(index > -1) {
            const newEvents = events
            newEvents[index] = { ...newEvent }
            setEvents(newEvents)
        } else {
            setEvents([events, {...newEvent},])
        }
    }

    //fonction de suppression d'un rdv ==============================> ici mon delete en bdd!!!!
    const handleEventDelete = () => {
        const index = events.findIndex(event => {
            return event.id === modalEvent.id
        })
        if(index > -1) {
            const newEvents = events
            newEvents.splice(index, 1)
            setEvents(newEvents)
        }
    }

    //au chargement du composant, je récupère le tableau de mes rdv par id client si l'utilisateur a le role user ou par id entrepôt si utilisateur est charvin ou admin
    useEffect(() => {
        if(infos===null) {
           return setRedirect(true)
        }

        //getBookings()

        console.log('calendar', Calendar)
        
    }, [])



    return (
        <>
        {redirect && <Redirect to='/'/>}
        <Authorized />

        <div className="booking">
            <h1 className="booking-title">calendrier des rdv actuellement planifiés</h1>
            {isLoading && <p className="booking-p-message-chargement">chargement...</p>}
            {/* {message!==null && <p className="booking-p-message-chargement">{message}</p>} */}
            {events.length === 0 &&<p className="booking-p-message">Il n'y a aucun rdv de planifié pour l'instant</p>}
            {error!==null &&<p className="booking-p-error">{error}</p>}
            {/* {err!==null &&<p className="booking-p-error">{err}</p>} */}

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
                resizable={true}                                       //rdv redimensionnable sur les plages ============>verif mais non supporté???????
                onEventResize={resizeEvent}                            //fonction redimensionnement          ============>verif mais non supporté???????
                selectable={true}                                      //plage selectionnable
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
