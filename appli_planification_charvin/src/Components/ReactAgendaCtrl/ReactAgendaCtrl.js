import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { guid } from 'react-agenda'
import moment from 'moment'
import './ReactAgendaCtrl.css'

let now = new Date()


//composant enfant: détails de la popup de création ou d'affichage d'un rdv sur l'agenda
//composant natif à react-agenda remanipulé => https://github.com/Revln9/react-agenda/blob/master/src/reactAgendaCtrl.js
export default function ReactAgendaCtrl(props) {

    //initialisation de l'objet des states qui serviront à afficher les données du rdv + alimentation de la bdd
    const [rdv, setRdv] = useState({
        editMode: false,
        showCrtl: false,
        multiple: {},
        name: "",
        natureBooking: "",
        refNumber: "",
        paletsQuantity: "",
        carrierSupplier: "",
        classes: "",
        startDateTime: props.selected,
        endDateTime: moment(props.selected).add(30, 'minutes')
    })

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

    ///au chargement du composant (fonction du composant natif reactAgendaCtrl de react-agenda adapté à l'appli)
    useEffect(() => {
        console.log('props', props)

        //j'appelle ma couleur de l'agenda
        if(props.itemColors) {
            setRdv({
                classes: props.itemColors
            })
        }

        //je vérifie si la cellule selectionnée ou plage selectionnée est vide (si oui, mode add) ou pleine (si oui, mode edit)
        if(!props.selectedCells) {
            return setRdv({
                editMode: false,
                name: "",
                natureBooking: "",
                refNumber: "",
                paletsQuantity: "",
                carrierSupplier: "",
                startDateTime: props.selected,
                endDateTime: moment(props.selected).add(30, 'minutes')
            })
        }

        if(props.selectedCells && props.selectedCells.length === 1) {
            return setRdv({
                editMode: false,
                name: "",
                natureBooking: "",
                refNumber: "",
                paletsQuantity: "",
                carrierSupplier: "",
                startDateTime: props.selected,
                endDateTime: moment(props.selected).add(30, 'minutes')
            })
        }

        if(props.selectedCells && props.selectedCells.length > 0) {
            return setRdv({
                editMode: false,
                name: "",
                natureBooking: "",
                refNumber: "",
                paletsQuantity: "",
                carrierSupplier: "",
                startDateTime: props.selected,
                endDateTime: moment(props.selected).add(30, 'minutes')
            })
        }

        if(props.selectedCells && props.selectedCells[0] && props.selectedCells[0]._id) {
            return setRdv({
                editMode: true,
                name: props.selectedCells[0].name,
                natureBooking: props.selectedCells[0].natureBooking,
                refNumber: props.selectedCells[0].refNumber,
                paletsQuantity: props.selectedCells[0].paletsQuantity,
                carrierSupplier: props.selectedCells[0].carrierSupplier,
                classes: props.selectedCells[0].classes,
                startDateTime: props.selected,
                endDateTime: moment(props.selected).add(30, 'minutes')
            })
        }
        
    }, [])

    //fonction de choix des cellules (fonction du composant natif reactAgendaCtrl)
    const dispatchEvent = (obj) => {
        let newAdded = []         //tableau qui va accueillir l'ajout
        let items = props.items   //tableau de tous les rdv
        let objAdd                //initialisation de l'objet du rdv


        if(obj['multiple']) {
            let array = obj['multiple']
            array.forEach(((key) => {
                let newArr = array[key].filter((val, ind) => {
                    return array[key].indexOf(val) == ind
                })
                let start = newArr[0]
                let end = newArr[newArr.length - 1]
                objAdd = {
                    _id: guid(),
                    name: obj.name,
                    natureBooking: obj.natureBooking,
                    refNumber: obj.refNumber,
                    paletsQuantity: obj.paletsQuantity,
                    carrierSupplier: obj.carrierSupplier,
                    classes: getColor(),
                    startDateTime: new Date(start),
                    endDateTime: new Date(end)
                }
                items.push(objAdd)
                newAdded.push(objAdd)
            }))
            return props.Addnew(items, newAdded)
        }
        obj._id = guid()
        items.push(obj)
        props.Addnew(items, obj)
        
    }

    //Ajout d'un rdv (fonction du composant natif reactAgendaCtrl de react-agenda)
    const addEvent = () => {
        if(rdv.name.length < 1) {
            return
        }

        if(props.selectedCells && props.selectedCells.length > 0) {
            let obj = props.selectedCells.reduce((r, v, i, a, k = v.substring(0, 10)) => ((r[k] = r[k] || []).push(v), r), {})
        
            if(Object.values(obj).length > 1) {
                let newObj = {
                    name: rdv.name,
                    natureBooking: rdv.natureBooking,
                    refNumber: rdv.refNumber,
                    paletsQuantity: rdv.paletsQuantity,
                    carrierSupplier: rdv.carrierSupplier,
                    classes: getColor(),
                    startDateTime: new Date(rdv.startDateTime),
                    endDateTime: new Date(rdv.endDateTime),
                    multiple: obj
                }
                return dispatchEvent(newObj)
            }
        
            let newObj = {
                name: rdv.name,
                natureBooking: rdv.natureBooking,
                refNumber: rdv.refNumber,
                paletsQuantity: rdv.paletsQuantity,
                carrierSupplier: rdv.carrierSupplier,
                classes: getColor(),
                startDateTime: new Date(rdv.startDateTime),
                endDateTime: new Date(rdv.endDateTime)
            }
            return dispatchEvent(newObj)
        }
    }

    //modification d'un rdv (fonction du composant natif reactAgendaCtrl de react-agenda)
    const updateEvent = () => {
        if(props.selectedCells[0]._id && props.item) {
            let newObj = {
                _id: props.selectedCells[0]._id,
                name: rdv.name,
                natureBooking: rdv.natureBooking,
                refNumber: rdv.refNumber,
                paletsQuantity: rdv.paletsQuantity,
                carrierSupplier: rdv.carrierSupplier,
                classes: getColor(),
                startDateTime: new Date(rdv.startDateTime),
                endDateTime: new Date(rdv.endDateTime)
            }
            let items = props.items
            for(let i=0; i<items.length; i++) {
                if(items[i]._id === newObj._id) {
                    items[i] = newObj
                }
            }
            if(props.edit) {
                props.edit(items, newObj)
            }
    }

    // fonction d'envoi du formulaire pour une création de rdv
    const handleSubmit = (e) => {
        if(rdv.name || rdv.natureBooking || rdv.refNumber || rdv.paletsQuantity || rdv.carrierSupplier || rdv.classes || rdv.startDateTime || rdv.endDateTime) {
            return setError("tous les champs ne sont pas remplis, veuillez terminer la saisie")
        }
        e.preventDefault()
        addEvent()
       
    }

    // fonction d'envoi du formulaire pour une modification de rdv
    const handleEdit = (e) => {
        if(rdv.name || rdv.natureBooking || rdv.refNumber || rdv.paletsQuantity || rdv.carrierSupplier || rdv.classes || rdv.startDateTime || rdv.endDateTime) {
            return setError("tous les champs ne sont pas remplis, veuillez terminer la saisie")
        }
        e.preventDefault()
        updateEvent()
    }


    return (
        <div className="booking-agendactrl-container">

            {error!==null &&<p className="booking-agendactrl-p-error">{error}</p>}

            {/* formulaire d'affichage uniquement pour le mode édition du rdv */}
            {rdv.editMode &&
            <form
            className="booking-agendactrl"
            onSubmit={rdv.editMode ? handleEdit() : rdv.editMode === false && handleSubmit()}
                
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
                    {rdv.editMode && 
                        <option defaultValue={props.natureBooking} className="booking-agendactrl-select-option">{props.natureBooking}</option>
                    }
                    {rdv.editMode === false &&
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
                }

        </div>
    )
}
}

ReactAgendaCtrl.propTypes = {
    items: PropTypes.array,
    itemColors: PropTypes.object,
    selectedCells: PropTypes.array,
    edit: PropTypes.func,
    Addnew: PropTypes.func
  
  };
  
  ReactAgendaCtrl.defaultProps = {
    items: [],
    itemColors: {},
    selectedCells: []
    }
