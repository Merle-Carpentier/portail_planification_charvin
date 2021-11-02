import moment from 'moment'

export default function EventWrapper({ event, children }) {

    //modification des constantes pour customiser l'objet event du calendrier
    const { title, className } = children.props                   //dedans il y aura ref rdv + nb palettes
    const customingClass = `${className} event-${event.customClass}`  //je crée une classe supplémentaire en css pour gérer la couleur
    const start = moment(event.startDateTime).hour()
    const end = moment(event.endDateTime).hour()
    const carrier = event.carrierSupplier



    return (
        <div
        title={title}
        carrier={carrier}
        className={customingClass}
        >
            {children.props.children}
        </div>
    )
}
