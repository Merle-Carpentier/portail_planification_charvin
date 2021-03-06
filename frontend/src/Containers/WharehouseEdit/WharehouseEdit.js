import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link , useHistory} from 'react-router-dom'
import { convertDate } from '../../util/util.js'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Edit.css'


//page de formulaire de récupération d'un entrepôt
export default function WharehouseEdit(props) {

    //initialisation des states des données de l'api + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [created, setCreated] = useState("")
    const [updated, setUpdated] = useState("")
    const [error, setError] = useState(null)

    //on utilise le hook history pour revenir en arrière
    const history = useHistory()
    
    //appel action du store
    const dispatch = useDispatch()

    let id = props.match.params.id

    //fonction de récupération d'un entrepôt
    const getWharehouse = (whId) => {
        axios.get(`${configApi.api_url}/api/detailWharehouse/${whId}`)
        .then((response) => {
            console.log(response)
            setName(response.data.data.name)
            setAddress(response.data.data.address)
            setZip(response.data.data.zip)
            setCity(response.data.data.city)
            setCreated(response.data.data.createdAt)
            setUpdated(response.data.data.updatedAt)
        })
        .catch((error) => {
            console.log('detailWharehouse err', error) 
            setError("Impossible d'afficher l'entrepôt, tentez de rafraîchir la page svp")
        })
    }

    //Chargement des infos au chargement du composant
    useEffect(() => {

        getWharehouse(id)
          
    }, [])


    return (
        <>
            <Authorized />

            <div className="edit">

                <h1 className="edit-title">affichage détaillé de l'entrepôt:</h1>

                {/*affichage du message d'erreur*/}
                {error !== null && <p className="edit-error">{error}</p>}

                {/*Affichage des données avec conditionnel*/}

                <article className="edit-article">
                    <h2 className="edit-article-title">{name}</h2>
                    <p className="edit-article-p">Adresse: {address}</p>
                    <p className="edit-article-p">Code postale: {zip}</p>
                    <p className="edit-article-p edit-upper">Ville: {city}</p>
                    <p className="edit-article-p">Créé le: {convertDate(created)}</p>
                    <p className="edit-article-p">Mis à jour le: {convertDate(updated)}</p>
                </article>

                <button className="edit-btn-mod">
                    <Link className="edit-link" to={`/admin/wharehouse/modif/${id}`}>
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
