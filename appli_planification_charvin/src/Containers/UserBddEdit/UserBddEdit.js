import { useState, useEffect } from 'react'
import { Link , useHistory} from 'react-router-dom'
import { convertDate } from '../../util/util.js'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Edit.css'

const token = localStorage.rdvCharvin
const userCharvin = JSON.parse(localStorage.userCharvin)
const userId = userCharvin[0].id

//page de formulaire d'ajout d'un entrepôt
export default function UserBddEdit(props) {

    //initialisation des states des données de l'api + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [wharehouseName, setWharehouseName] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [created, setCreated] = useState("")
    const [updated, setUpdated] = useState("")
    const [error, setError] = useState(null)

    //on utilise le hook history pour revenir en arrière
    const history = useHistory()
    
    let id = props.match.params.id

    //fonction de récupération d'un utilisateur
    const getUserBdd = (usId) => {
        axios.get(`${configApi.api_url}/api/detailUser/${usId}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            console.log(response)
            setName(response.data.data.name)
            setAddress(response.data.data.address)
            setZip(response.data.data.zip)
            setCity(response.data.data.city)
            setWharehouseName(response.data.data.Wharehouse.name)
            setCustomerName(response.data.data.Customer.name)
            setCreated(response.data.data.createdAt)
            setUpdated(response.data.data.updatedAt)
        })
        .catch((error) => {
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
                    <h2 className="edit-article-title">{name}</h2>
                    <p className="edit-article-p">Adresse: {address}</p>
                    <p className="edit-article-p">Code postale: {zip}</p>
                    <p className="edit-article-p edit-upper">Ville: {city}</p>
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
