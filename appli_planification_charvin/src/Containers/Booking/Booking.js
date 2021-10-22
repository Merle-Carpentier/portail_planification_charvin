import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReactAgenda , ReactAgendaCtrl , guid ,  Modal } from 'react-agenda'
import moment from 'moment'
import { allBookings } from '../../redux/actions/bookingActions'
import { configApi } from '../../apiCalls/configApi'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import './Booking.css'

const token = localStorage.rdvCharvin
const userCharvin = JSON.parse(localStorage.userCharvin)
const userId = userCharvin[0].id

//Initialisation des couleurs pour l'agenda
let colors = {
    "color-b": "rgba(16, 68, 118, 1)",
    "color-v": "rgba(132, 255, 128, 1)",
    "color-o": "rgba(234, 103, 23, 0.4)"
}

//initialisation de la date
let now = new Date()

export default function Booking() {

    //initialisation des states
    const [items, setItems] = useState([])   //rdv
    const [selected, setSelected] = useState()     //créneaux
    const [cellHeight, setCellHeight] = useState(40)       //taille cellules
    const [showModal, setShowModal] = useState(false)      //affichage ou non popUp
    const [locale, setLocale] = useState('fr')             //fuseau horaire
    const [rowsPerHour, setRowsPerHour] = useState(4)       //nombre de cellule par heure (récupération dans le store customersi utilisateur=user)
    const [numberOfDays, setNumberOfDays] = useState(6)    //nombre de jour (récupération dans le store customer si utilisateur=user)
    const [startDate, setStartDate] = useState(new Date()) //date de départ (actuelle)
    const [error, setError] = useState(null)

    //Je récupère mes infos utilisateur dans le store
    const user = useSelector(state => state.userReducer.infos)

    //je crée un tableau de récupération de rdv selon les requêtes
    let bookings = []

    /////////////////////////////////////  FONCTIONS POUR L'AGENDA /////////////////////////////////////////////////
    //fonction: je verifie les cellules selectionnées
    const handleCellSelection = (item) => {
        console.log('handleCellSelection item', item)
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
            startDateTime: moment(newItem.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: moment(newItem.endDateTime).format('YYYY-MM-DD HH:mm:ss'),
            natureBooking: newItem.natureBooking,
            classColor: newItem.classColor,
            bookingName: newItem.bookingName,
            refNumber: newItem.refNumber,
            paletsQuantity: newItem.paletsQuantity,
            carrierSuppier: newItem.carrierSuppier,
            customerId: newItem.customerId,
            wharehouseId: newItem.wharehouseId,
            userId: user.id,
            _id: newItem._id
        }
        //envoi bdd
        axios.post(`${configApi.api_url}/api/addBooking`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep addNewEvent', response)
            if(response.status === 200){
                setItems(items)
            }
            setShowModal(false)
        })
        .catch((error) => {
            console.log('err handleItemRemove', error)
            setError("impossible d'enregistrer le rdv, veuillez recommencer ou contacter Charvin")
        })
    }
    
    //fonction: j'ouvre la popup du rdv pour éventuellement le modifier
    const handleItemEditModif = (item, newItem) =>{
        console.log('handleItemEdit item', item)
        console.log('handleItemEdit newItem', newItem)
        //mise à jour de la state selected et showModal
        setSelected(item);
        setShowModal(true)
            
    }

    //fonction mise à jour du rdv
    const ModifEvent = (item, newItem)=> {
        console.log('ModifEvent item', item)
        console.log('ModifEvent newItem', newItem)

        //datas du rdv pour envoyer dans bdd
        const datas = {
            startDateTime: moment(newItem.startDateTime).format('YYYY-MM-DD HH:mm:ss'),
            endDateTime: moment(newItem.endDateTime).format('YYYY-MM-DD HH:mm:ss'),
            natureBooking: newItem.natureBooking,
            classColor: newItem.classColor,
            bookingName: newItem.bookingName,
            refNumber: newItem.refNumber,
            paletsQuantity: newItem.paletsQuantity,
            carrierSuppier: newItem.carrierSuppier,
            customerId: newItem.customerId,
            wharehouseId: newItem.wharehouseId,
            userId: user.id,
            _id: newItem._id
        }

        //envoi bdd
        axios.put(`${configApi.api_url}/api/updateBooking${newItem._id}`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep addNewEvent', response)
            if(response.status === 200){
                //setItems(items) => reloader le tableau
            }
            setShowModal(false)
        })
        .catch((error) => {
            console.log('err handleItemRemove', error)
            setError("impossible de modifier le rdv, veuillez recommencer ou contacter Charvin")
        })
    }


    //fonction: je supprime le rdv
    const handleItemRemove = (items, deleteItem) => {
        console.log('handleItemRemove items', items)
        console.log('handleItemRemove deleteItem', deleteItem)

        //appel api pour supprimer un rdv
        axios.delete(`${configApi.api_url}/api/deleteBooking/${deleteItem._id}`, {headers: {"x-access-token": token, "userId": userId}})
        .then(response => {
            console.log('rep handleItemRemove')
            if(response.status === 200){
                setItems(items)
            }
        })
        .catch((error) => {
            console.log('err handleItemRemove', error)
            setError("impossible de supprimer le rdv, veuillez recommencer ou contacter Charvin")
        })
    }

    ////////////////////////////// FONCTIONS POUR LE USEEFFECT ///////////////////////////////////////
    //requête des rdv par wharehouseId pour le useEffect
    const getBookingsByWharehouseId = (whId) => {
        axios.get(`${configApi.api_url}/api/bookingsByWharehouse/${whId}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            console.log('rep bookingbywh', response)
            //je mets les datas dans mon tableau booking
            bookings.push(response.data.data)
            //je mape pour transformer les datee de la bdd
            bookings.map((book) => {
                book.startDateTime = new Date(book.startDateTime)
                book.endDateTime = new Date(book.endDateTime)
            })
            //mise à jour de la state avec les bonnes heures
            setItems(bookings)
        })
        .catch((error) => {
            console.log('err bookingbywh', error)
            setError("impossible de charger les rdv, veuillez recommencer ou contacter Charvin")
        })
    }
    
    
    //requête des rdv par customerID pour le useEffect
    const getBookingsByCustomerId = (custId) => {
        axios.get(`${configApi.api_url}/api/bookingsByWharehouse/${custId}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            console.log('rep bookingbycust', response)
            //je mets les datas dans mon tableau booking
            bookings.push(response.data.data)
            //je mape pour transformer les datee de la bdd
            bookings.map((book) => {
                book.startDateTime = new Date(book.startDateTime)
                book.endDateTime = new Date(book.endDateTime)
            })
            //mise à jour de la state avec les bonnes heures
            setItems(bookings)

            //récupération des infos client par l'id pour obtenir rowsPerHour et numberOfDays
            axios.get(`${configApi.api_url}/api/detaiCustomer/${custId}`, {headers: {"x-access-token": token, "userId": userId}})
            .then((response) => {
                console.log('rep detail customer ds bookingbycust', response)
                setRowsPerHour(response.data.data.rowsPerHour)
                setNumberOfDays(response.data.data.numberOfDays)
            })
        })
        .catch((error) => {
            console.log('err bookingbywh', error)
            setError("impossible de charger les rdv, veuillez recommencer ou contacter Charvin")
        })
    }
    
    //choix de la requête d'affichage des rdv en fonction de l'utilisateur
    const getGoogBookings = () => {
        if(user.role === "admin" || user.role === "charvin") {
            getBookingsByWharehouseId(user.wharehouseId)
        }else {
            getBookingsByCustomerId(user.customerId)
        }
    }
    

    useEffect(() => {
        console.log('user', user)

        //getGoogBookings()
        
    }, [])

    return (
        <>
            <Authorized />
            <h1>Booking</h1>
        </>
    )
}
