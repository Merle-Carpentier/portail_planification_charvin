import { useState } from 'react'
import './ReactAgendaCtrl.css'

let now = new Date()

//Initialisation des couleurs pour l'agenda
let colors = {
    "color-b": "rgba(16, 68, 118, 1)",
    "color-v": "rgba(132, 255, 128, 1)",
    "color-o": "rgba(234, 103, 23, 0.4)"
}

export default function ReactAgendaCtrl() {

    //initialisation des states
    const [startDateTime, setStartDateTime] = useState(new Date())
    // pas besoin de endDateTime car il est par défaut de 30 minutes après startDateTime avant envoi à la bdd
    const [natureBooking, setNatureBooking] = useState("")
    const [classColor, setClassColor] = useState("")                        //voir pour mettre une condition typebooking=color
    const [bookingName, setbookingName] = useState("")
    const [refNumber, setRefNumber] = useState("")
    const [paletsQuantity, setpaletsQuantity] = useState("")
    const [carrierSupplier, setCarrierSupplier] = useState("")



    return (
        <form className="booking-agendactrl">

            <h2 className="booking-agendactrl-title">détail du rdv</h2>

            <label className="booking-agendactrl-label">Heure du rdv: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={new Date(startDateTime)}
            onChange= {(e) => {
                setStartDateTime(e.currentTarget.value)
            }} />

            <select
            name="natureBooking"
            className="booking-agendactrl-select"
            onChange={(e) => {
                setNatureBooking(e.currentTarget.value)

            }}>
                <option defaultvalue={natureBooking} className="booking-agendactrl-select-option">{natureBooking}</option>
                <option value="reception" className="booking-agendactrl-select-option">livraison</option>
                <option value="expedition" className="booking-agendactrl-select-option">chargement</option>
                <option value="reserve" className="booking-agenda-ctrl-select-option">réservé Charvin</option>
            </select>

            <label className="booking-agendactrl-label">Nom du rdv: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={bookingName}
            onChange= {(e) => {
                setbookingName(e.currentTarget.value)
            }} />

            <label className="booking-agendactrl-label">Ref rdv: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={refNumber}
            onChange= {(e) => {
                setRefNumber(e.currentTarget.value)
            }} />

            <label className="booking-agendactrl-label">Nb palettes: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={paletsQuantity}
            onChange= {(e) => {
                setpaletsQuantity(e.currentTarget.value)
            }} />

            <label className="booking-agendactrl-label">Transporteur: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={carrierSupplier}
            onChange= {(e) => {
                setCarrierSupplier(e.currentTarget.value)
            }} />

            </form>
    )
}
