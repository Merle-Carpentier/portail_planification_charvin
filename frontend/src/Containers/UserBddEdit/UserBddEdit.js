import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link , useHistory} from 'react-router-dom'
import { convertDate } from '../../util/util.js'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Edit.css'


//page de formulaire d'edition d'un utilisateur
export default function UserBddEdit(props) {

    //initialisation des states des données de l'api + message erreur + redirection
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [wharehouseName, setWharehouseName] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [role, setRole] = useState("")
    const [created, setCreated] = useState("")
    const [updated, setUpdated] = useState("")
    const [error, setError] = useState(null)

    //on utilise le hook history pour revenir en arrière
    const history = useHistory()

    //const pour dispatch action du store
    const dispatch = useDispatch()
    
    let id = props.match.params.id

    //fonction de récupération d'un utilisateur
    const getUserBdd = (usId) => {
        axios.get(`${configApi.api_url}/api/detailUser/${usId}`)
        .then((response) => {
            //console.log(response)
            setLastName(response.data.data.lastName)
            setFirstName(response.data.data.firstName)
            setEmail(response.data.data.email)
            setRole(response.data.data.role)
            setWharehouseName(response.data.data.Wharehouse.name)
            setCustomerName(response.data.data.Customer.name)
            setCreated(response.data.data.createdAt)
            setUpdated(response.data.data.updatedAt)
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('detailUser err', error) 
            setError("Impossible d'afficher l'utilisateur, tentez de rafraîchir la page svp")
        })
    }

    //Chargement des infos au chargement du composant
    useEffect(() => {

        getUserBdd(id)
          
    }, [])


    return (
        <>
            <Authorized />

            <div className="edit">

                <h1 className="edit-title">affichage détaillé de l'utilisateur:</h1>

                {/*affichage du message d'erreur*/}
                {error !== null && <p className="edit-error">{error}</p>}

                {/*Affichage des données avec conditionnel*/}

                <article className="edit-article">
                    <h2 className="edit-article-title">{firstName} {lastName}</h2>
                    <p className="edit-article-p">Email: {email}</p>
                    <p className="edit-article-p">Role: {role}</p>
                    <p className="edit-article-p edit-upper">Entrepôt d'affectation: {wharehouseName}</p>
                    <p className="edit-article-p edit-upper">Client d'affectation: {customerName}</p>
                    <p className="edit-article-p">Créé le: {convertDate(created)}</p>
                    <p className="edit-article-p">Mis à jour le: {convertDate(updated)}</p>
                </article>

                <button className="edit-btn-mod">
                    <Link className="edit-link" to={`/admin/userBdd/modif/${id}`}>
                        <i className="fas fa-pen"> modifier</i>
                    </Link>                                          
                </button>

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
