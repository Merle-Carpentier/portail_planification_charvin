import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'

const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin

//page de formulaire d'ajout d'un entrepôt
export default function WharehouseAdd() {

    //initialisation des states du formulaire + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

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
        axios.post(`${configApi.api_url}/api/addWharehouse`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            if(response.status === 200) {
                setRedirect(true)
            }
        })
        .catch((error) => {
            console.log('addWharehouse err', error) 
            setError("Impossible d'enregistrer l'entrepôt, veuillez recommencer")
        })
    }


    return (
        <>
            {/*retour à la page admin si redirect est true*/}
            {redirect && <Redirect to='/admin' />}

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
