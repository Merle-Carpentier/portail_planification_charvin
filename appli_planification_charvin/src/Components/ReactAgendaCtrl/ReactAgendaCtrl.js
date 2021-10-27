import { useState, useEffect } from 'react'
import moment from 'moment'
import './ReactAgendaCtrl.css'


//composant enfant: détails de la popup de création ou d'affichage d'un rdv sur l'agenda
export default function ReactAgendaCtrl(props) {

    const onClickEvent = () => {
        if(props.name ==="") {
            return props.addNewEvent
        }else if(props.name!=="") {
            return props.editEvent
        }
    }

    useEffect(() => {
        console.log('props', props)
        onClickEvent()
    }, [])


    return (
        <form
        className="booking-agendactrl"
        
        >

            <h2 className="booking-agendactrl-title">Détail du rdv</h2>
            <p className="booking-agendactrl-p">du {moment(props.selected).format('DD-MM-YYYY à HH:mm')}</p>

            <label className="booking-agendactrl-label">Choix du type de rdv</label>
            <select
            name="natureBooking"
            className="booking-agendactrl-select"
            onChange={(e) => {
                props.setNatureBooking(e.currentTarget.value)

            }}>
                <option defaultValue={props.natureBooking} className="booking-agendactrl-select-option">{props.natureBooking}</option>
                <option value="reception" className="booking-agendactrl-select-option">livraison</option>
                <option value="expedition" className="booking-agendactrl-select-option">chargement</option>
                <option value="reserve" className="booking-agenda-ctrl-select-option">réservé Charvin</option>
            </select>

            <label className="booking-agendactrl-label">Nom du rdv: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={props.name}
            onChange= {(e) => {
                props.setName(e.currentTarget.value)
            }} />

            <label className="booking-agendactrl-label">Ref rdv: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={props.refNumber}
            onChange= {(e) => {
                props.setRefNumber(e.currentTarget.value)
            }} />

            <label className="booking-agendactrl-label">Nb palettes: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={props.paletsQuantity}
            onChange= {(e) => {
                props.setpaletsQuantity(e.currentTarget.value)
            }} />

            <label className="booking-agendactrl-label">Transporteur: </label>
            <input
            type="text"
            className="booking-agendactrl-input"
            value={props.carrierSupplier}
            onChange= {(e) => {
                props.setCarrierSupplier(e.currentTarget.value)
            }} />

            <input className="booking-agendactrl-btn" type="submit" value="enregistrer" />

            </form>
    )
}
