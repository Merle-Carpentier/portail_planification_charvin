import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'

const token = localStorage.rdvCharvin

//page de formulaire d'ajout d'un entrepôt
export default function WharehouseAdd() {

    //initialisation des states du formulaire + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [redirectLog, setRedirectLog] = useState(false)

    //appel action du store
    const dispatch = useDispatch()

    //fonction d'envoi du formulaire
    const onSubmitForm = () => {
        //message d'erreur si les champs ne sont remplis
        if(name==="" || address==="" || zip==="" || city===""){
            return setError("Tous les champs ne sont pas remplis!")
        }
        //récupération des states dans datas + envoie des données vers l'api
        let datas = {
            name: name,
            address: address,
            zip: zip,
            city: city
        }
        axios.post(`${configApi.api_url}/api/addWharehouse`, datas, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200) {
                setRedirect(true)
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
                return setRedirectLog(true)
            }
            console.log('addWharehouse err', error) 
            setError("Impossible d'enregistrer l'entrepôt, veuillez recommencer")
        })
    }


    return (
        <>
            {/*retour à la page admin si redirect est true*/}
            {redirect && <Redirect to='/admin' />}

            {/*retour à la page de connexion si redirectLog est true*/}
            {redirectLog && <Redirect to='/' />}

            <Authorized />

            <div className="AddMod">

                <h1 className="AddMod-title">ajout d'un entrepôt charvin logistics</h1>

                {/*affichage du message d'erreur*/}
                {error !== null && <p className="AddMod-error">{error}</p>}

                {/*formulaire d'ajout*/}
                <form 
                className="AddMod-form"
                onSubmit = {(e) => {
                    e.preventDefault()
                    onSubmitForm()
                }}>

                <label className="AddMod-label">nom</label>
                <input 
                type="text"
                className="AddMod-input input-upper"
                onChange={(e) => {
                    setName(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">adresse</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setAddress(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">code postal</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setZip(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">ville</label>
                <input 
                type="text"
                className="AddMod-input input-upper"
                onChange={(e) => {
                    setCity(e.currentTarget.value)
                }}/>

                <input
                className="AddMod-input-submit"
                type="submit"
                name="Envoyer"
                value="ENREGISTRER" />

                </form>
                
            </div>
        </>
    )
}
