import { useState, useEffect } from 'react'
import { guid } from 'react-agenda'
import moment from 'moment'
import './ReactAgendaCtrl.css'

let now = new Date()

export default function ReactAgendaCtrl(props) {

    //initialisation de l'objet des states qui serviront à afficher les données du rdv + alimentation de la bdd
    const [rdv, setRdv] = useState({
        name: "",
        natureBooking: "",
        refNumber: "",
        paletsQuantity: "",
        carrierSupplier: "",
        classes: "",
        startDateTime: props.selected
        //endDateTime: moment(props.selected).add(30, 'minutes')
    })

    const [editMode, setEditMode] = useState(null)

    const [error, setError] = useState(null)

    //fonction pour récupérer la bonne couleur de classes en fonction de la nature du rdv
    const getColor = () => {
        if(rdv.natureBooking === "reception") {
            return setRdv({
                classes: "color-v"})
        } else if(rdv.natureBooking === "expedition") {
            return setRdv({
                classes: "color-o"})
        }else {
            return setRdv({
                classes: "color-b"})
        }
    }



    useEffect(() => {
        
         //j'appelle ma couleur de l'agenda
         if(props.itemColors) {
            setRdv({
                classes: props.itemColors
            })
        }

        //je vérifie si la cellule selectionnée est vide (si oui, mode add) ou pleine (si oui, mode edit)
        if(!props.selected) {
            setEditMode(false)
            setRdv({
                name: "",
                natureBooking: "",
                refNumber: "",
                paletsQuantity: "",
                carrierSupplier: "",
                startDateTime: props.selected
                //endDateTime: moment(props.selected).add(30, 'minutes')
            })
        }

        if(props.selected && props.selected._id) {
            setEditMode(true)
            setRdv({
                name: props.selected.name,
                natureBooking: props.selected.natureBooking,
                refNumber: props.selected.refNumber,
                paletsQuantity: props.selected.paletsQuantity,
                carrierSupplier: props.selected.carrierSupplier,
                classes: props.selected.classes,
                startDateTime: props.selected
                //endDateTime: moment(props.selected).add(30, 'minutes')
            })
        }

        console.log('editMode', editMode)

    }, [])

    return (
        <div className="booking-agendactrl-container">

            {error!==null &&<p className="booking-agendactrl-p-error">{error}</p>}

            {/* formulaire d'affichage uniquement pour le mode édition du rdv */}
            
            <form
            className="booking-agendactrl"
            //onSubmit={rdv.editMode ? handleEdit() : rdv.editMode === false && handleSubmit()}
                
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
                    {editMode && 
                        <option defaultValue={props.natureBooking} className="booking-agendactrl-select-option">{props.natureBooking}</option>
                    }
                    {editMode === false &&
                        <option className="booking-agendactrl-select-option">--choisissez dans la liste--</option>
                    }
                    <option value="reception" className="booking-agendactrl-select-option">livraison</option>
                    <option value="expedition" className="booking-agendactrl-select-option">chargement</option>
                    <option value="reserve" className="booking-agenda-ctrl-select-option">réservé Charvin</option>
                </select>

                <label className="booking-agendactrl-label">Nom du rdv: </label>
                <input
                type="text"
                className="booking-agendactrl-input"
                value={rdv.name}
                onChange= {(e) => {
                    setRdv({
                        name: e.currentTarget.value})
                }} />

                <label className="booking-agendactrl-label">Ref rdv: </label>
                <input
                type="text"
                className="booking-agendactrl-input"
                value={rdv.refNumber}
                onChange= {(e) => {
                    setRdv({
                        refNumber: e.currentTarget.value})
                }} />

                <label className="booking-agendactrl-label">Nb palettes: </label>
                <input
                type="text"
                className="booking-agendactrl-input"
                value={rdv.paletsQuantity}
                onChange= {(e) => {
                    setRdv({
                        paletsQuantity: e.currentTarget.value})
                }} />

                <label className="booking-agendactrl-label">Transporteur: </label>
                <input
                type="text"
                className="booking-agendactrl-input"
                value={rdv.carrierSupplier}
                onChange= {(e) => {
                    setRdv({
                        carrierSupplier: e.currentTarget.value})
                }} />

                <input className="booking-agendactrl-btn" type="submit" value="enregistrer" />

                </form>

        </div>
    )
}
