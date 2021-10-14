import { useState, useEffect } from 'react'
import { Link , useHistory} from 'react-router-dom'
import { convertDate } from '../../util/util.js'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import './WharehouseEdit.css'

const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')

//page de formulaire d'ajout d'un entrepôt
export default function WharehouseEdit(props) {

    //initialisation des states des données de l'api + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [created, setCreated] = useState("")
    const [updated, setUpdated] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    const history = useHistory()

    //Chargement des infos au chargement du composant
    useEffect(() => {

        let id = props.match.params.id
        axios.get(`${configApi.api_url}/api/detailWharehouse/${id}`, {headers: {"x-access-token": token, "userId": userId}})
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
       
    }, [])


    return (
        <>
            <Authorized />

            <div className="wharehouseEdit">

                <h1 className="wharehouseEdit-title">affichage détaillé de l'entrepôt:</h1>

                {/*affichage du message d'erreur*/}
                {error !== null && <p className="WharehouseEdit-error">{error}</p>}

                {/*Affichage des données avec conditionnel*/}

                <article className="wharehouseEdit-article">
                    <h2 className="wharehouseEdit-article-title">{name}</h2>
                    <p className="wharehouseEdit-article-p">{address}</p>
                    <p className="wharehouseEdit-article-p">{zip}</p>
                    <p className="wharehouseEdit-article-p wharehouseEdit-upper">{city}</p>
                    <p className="wharehouseEdit-article-p">créé le: {convertDate(created)}</p>
                    <p className="wharehouseEdit-article-p">mis à jour le: {convertDate(updated)}</p>
                </article>

                <button className="wharehouseEdit-btn-mod">
                    <Link className="admin-wharehouse-link" to='/admin/wharehouse/modif'>
                        <i className="fas fa-pen"> modifier</i>
                    </Link>                                          
                </button>

                <button
                className="wharehouseEdit-btn-prev"
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
