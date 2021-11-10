import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link , useHistory} from 'react-router-dom'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import { convertDate } from '../../util/util.js'
import '../../asset/cssCommun/pages_finissant_en_Edit.css'

const token = localStorage.rdvCharvin


//page de formulaire d'affichage d'un rdv
export default function BookingEdit(props) {

    //initialisation des states des données de l'api + message erreur + redirection
    const [name, setName] = useState("")
    const [startDateTime, setStartDateTime] = useState("")
    const [classes, setClasses] = useState("")
    const [customer, setCustomer] = useState("")
    const [wharehouse, setWharehouse] = useState("")
    const [user, setUser] = useState("")
    const [created, setCreated] = useState("")
    const [updated, setUpdated] = useState("")
    const [error, setError] = useState(null)

    //on utilise le hook history pour revenir en arrière
    const history = useHistory()

    //const pour dispatch action du store
    const dispatch = useDispatch()
    
    let id = props.match.params.id

    //fonction de récupération d'un utilisateur
    const getBooking = (bookId) => {
        axios.get(`${configApi.api_url}/api/detailBooking/${bookId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            console.log(response)
            setName(response.data.data.name)
            setStartDateTime(response.data.data.startDateTime)
            setCustomer(response.data.data.Customer.name)
            setWharehouse(response.data.data.Wharehouse.name)
            setUser(response.data.data.User.lastName)
            setCreated(response.data.data.createdAt)
            setUpdated(response.data.data.updatedAt)
            if(response.data.data.classes === "color-b") {
                setClasses("créneau réservé")
            } else if (response.data.data.classes === "color-v") {
                setClasses("expédition")
            } else {
                setClasses("réception")
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('detailBooking err', error) 
            setError("Impossible d'afficher le détail rdv, tentez de rafraîchir la page svp")
        })
    }

    //Chargement des infos au chargement du composant
    useEffect(() => {

        getBooking(id)
          
    }, [])


    return (
        <>
            <Authorized />

            <div className="edit">

                <h1 className="edit-title">affichage détaillé du rdv:</h1>

                {/*affichage du message d'erreur*/}
                {error !== null && <p className="edit-error">{error}</p>}

                {/*Affichage des données avec conditionnel*/}

                <article className="edit-article">
                    <h2 className="edit-article-title">{convertDate(startDateTime)}</h2>
                    <p className="edit-article-p">Référence et nb de palettes: {name}</p>
                    <p className="edit-article-p">Nature rdv: {classes}</p>
                    <p className="edit-article-p edit-upper">Entrepôt d'affectation: {wharehouse}</p>
                    <p className="edit-article-p edit-upper">Client d'affectation: {customer}</p>
                    <p className="edit-article-p edit-upper">Utilisateur ayant pris le rdv: {user}</p>
                    <p className="edit-article-p">Créé {convertDate(created)}</p>
                    <p className="edit-article-p">Mis à jour {convertDate(updated)}</p>
                </article>

                <button
                className="edit-btn-prev"
                onClick={(e) => {
                    e.preventDefault()
                    {history.goBack()}
                }}>
                    <i class="fas fa-arrow-left"></i>
                </button>
                   
            </div>
        </>
    )
}
