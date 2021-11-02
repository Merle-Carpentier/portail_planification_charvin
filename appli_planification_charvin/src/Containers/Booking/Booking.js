import { useState, useEffect } from 'react'
import { Redirect } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import Authorized from '../../Components/Authorized/Authorized'
import moment from 'moment'
import axios from 'axios'
import '../../Components/EventWrapper/EventWrapper'
import "react-big-calendar/lib/css/react-big-calendar.css"
import './Booking.css'
import { bookingsByCustomer, bookingsByWharehouse } from '../../redux/actions/bookingActions'

let now = new Date()
const culture = 'fr'
const localizer = momentLocalizer(moment)

export default function Booking(props) {

    //je pointe les states de mon store et j'initialise le dispatch des actions
    const bookingsById = useSelector(state => state.bookingReducer.bookingsById)
    const isLoading = useSelector(state => state.bookingReducer.isLoading)
    const error = useSelector(state => state.bookingReducer.isLoading)
    const infos = useSelector(state => state.userReducer.infos)
    const dispatch = useDispatch()

    //initialisation des states
    const [events, setEvents] = useState([])
    const [message, setMessage] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [start, setStart] = useState(new Date())
    const [end, setEnd] = useState(new Date())
    const [title, setTitle] = useState("")
    const [customClass, setCustomClass] = useState("")
    const [carrier, setCarrier] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [wharehouseId, setWharehouseId] = useState("")
    const [userId, setUserId] = useState("")

    //fonction de récupération des rdv
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

        setEvents(bookingsById)
    }


    //fonction de création du rdv
    const handleCreateEvent = () => {
        let newEvent = {
            start: start,
            end: end,
            title: title,
            customClass: customClass,
            carrier: carrier,
            customerId: customerId,
            wharehouseId: wharehouseId,
            userId: userId
        }

        setEvents([...events, newEvent])

        axios.post(`${configApi.api_url}/api/addBooking`, newEvent, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            if(response.status === 200) {
                setMessage("Le rdv a bien été rajouté")
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('addBooking err', error) 
            setError("Impossible d'enregistrer le rdv, veuillez recommencer")
        })

    }


    //fonction d'édition du rdv
    const handleDisplayDetails = (event) => {

    }

    //au chargement du composant, je récupère le tableau de mes rdv par id client si l'utilisateur a le role user ou par id entrepôt si utilisateur est charvin ou admin
    useEffect(() => {
        if(infos===null) {
           return setRedirect(true)
        }

        getBookings()

        console.log('calendar', Calendar)
        
    }, [])



    return (
        <>
        {redirect && <Redirect to='/'/>}
        <Authorized />
        <h1 className="booking-title">calendrier des rdv actuellement planifiés</h1>
        {isLoading && <p className="booking-p-message-chargement">chargement...</p>}
        {message!==null && <p className="booking-p-message-chargement">{message}</p>}
        {bookingsById.length === 0 &&<p className="booking-p-message">Il n'y a aucun rdv de planifié pour l'instant</p>}
        {error &&<p className="booking-p-error">{error}</p>}

        <Calendar
            // components={{
            //     eventWrapper: EventWrapper // composant à faire
            //     // event: Event
            // }}
            selectable
            titleAccessor="Référence rdv, nombre de palettes"
            startAccessor="Heure début"
            endAccessor="Heure fin"
            localizer={localizer}
            defaultDate={now}
            defaultView="week"
            events={events} 
            views={["week", "day", "agenda"]}
            min={8}                      //heure début?
            // max={16}                     //heure fin?
            //onSelectEvent={(event) => handleDisplayDetails(event)}  //edition fonction à faire
            onSelectSlot={handleCreateEvent}                        //création fonction 
            culture={culture}
            messages={{"today": "Aujourd'hui", "previous": "précédent", "next": "suivant"}}
        />
        </>
    )
}
