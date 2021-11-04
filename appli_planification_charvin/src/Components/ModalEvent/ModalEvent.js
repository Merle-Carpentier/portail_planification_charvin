import { useState } from 'react'
import Modal from 'react-modal'
import DatePicker from 'react-datepicker'

//style de Modal
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
}
//je lie Modal à app 
Modal.setAppElement('#root')

//Je crée un petit bouton lié aux props du calendar pour afficher les dates
const DateInputButton = (props) => {
    return (
        <button
        className="ModalEvent-date-inuput-btn"
        type="button"
        onClick={props.onClick}>{props.value}</button>   
    )
}

//Je fais le petit composant DatePicker sur la même page pour l'ajouter à ModalEvent
const DatePick = (props) => {   
    return (
        <DatePicker
        {...props}
        customInput={<DateInputButton />}
        required={true}
        dateFormat="dd/MM/yyyy HH:mm"
        showTimeSelect={true}
        timeCaption="Time"
        timeFormat="HH:mm"
        timeIntervals={30}
        showMonthDropdown={true}
        showWeekNumbers={true}
        shouldCloseOnSelect={true}
        popperModifiers={{
          offset: {
            enabled: true,
            offset: '-40px, 0px'
          }
        }}
        />
    )
}


export default function ModalEvent(props) {

    //appel des props du calendrier
    const { title, start, end, desc, id } = props.modalEvent

    //initialisation des states
    const [stateModalEvent, setStateModalEvent] = useState({
        title,
        start,
        end,
        desc,
        id: props.id,
        wharehouseId: props.wharehouseId,
        customerId: props.wharehouseId,
        userId: props.UserId
    })
    const [err, setErr] = useState(null)

    //suppression du rdv via les props de booking
    const handleDelete = () => {
        props.handleEventDelete()
        props.closeModal()
    }

    //envoi du formulaire modifié via les props de booking
    const handleSubmit = (e) => {
        e.preventDefault()
        if(stateModalEvent.start > stateModalEvent.end) {
            return setErr("la date de début est supérieure à la date de fin !")
        }
        props.handleEventSave(stateModalEvent)
        props.closeModal()
    }

    const { modalIsOpen, closeModal, isNewEvent } = props
    //const { title, start, end, desc } = stateModalEvent  => se met en erreur pour doublon de déclaration si je le laisse

    return (
        <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={true}
        onRequestClose={closeModal}
        closeTimeoutMS={200}
        >

            {err!==null && <p className="ModalEvent-err">{err}</p>}
            <form
            className="ModalEvent-form"
            onSubmit={handleSubmit}>
                <label className="ModalEvent-label">Référence rdv + nb palettes
                    <input
                    type="text"
                    className="ModalEvent-input-title"
                    placeholder="Référence rdv + nb pal"
                    onChange={(e) => {
                        setStateModalEvent({title: e.currentTarget.value})
                    }} />
                </label>
                <label className="ModalEvent-label">Heure début rdv
                    <DatePick
                    selected={start}
                    onChange={(newStart) => {
                        setStateModalEvent({start: newStart})
                    }} />
                </label>
                <label className="ModalEvent-label">Heure fin rdv
                    <DatePick
                    type="text"
                    selected={end}
                    onChange={(newEnd) => {
                        setStateModalEvent({end: newEnd})
                    }} />
                </label>
                <label className="ModalEvent-label">Fournisseur, transporteur, commentaires
                    <input
                    type="text"
                    className="ModalEvent-input-title"
                    placeholder="Fournisseur/transporteur, commentaires"
                    onChange={(e) => {
                        setStateModalEvent({desc: e.currentTarget.value})
                    }} />
                </label>
                <div className="ModalEvent-div-buttons">
                    {!isNewEvent && <button
                    className="ModalEvent-btn-del"
                    type="button"
                    onClick={handleDelete}>Supprimer</button>}

                    <button
                    className="ModalEvent-btn-cancel"
                    type="button"
                    onClick={closeModal}>Annuler</button>

                    <button
                    className="ModalEvent-btn-save"
                    type="submit">Enregistrer</button>
                </div>     
            </form>
        </Modal>
    )
}
