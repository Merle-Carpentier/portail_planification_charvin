import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'


const token = localStorage.rdvCharvin
const userCharvin = JSON.parse(localStorage.userCharvin)
const userId = userCharvin[0].id

//page de formulaire d'ajout d'un entrepôt
export default function CutomerAdd() {

    //initialisation des states du formulaire + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [rowsPerHour, setRowsPerHour] = useState()
    const [numberOfDays, setNumberOfDays] = useState()
    const [wharehouseId, setWharehouseId] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //je sélectionne mes tableaux Wharehouses et Customers dans le store
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses) 


    //fonction d'envoi du formulaire
    const onSubmitForm = () => {
        //message d'erreur si les champs ne sont remplis
        if(name==="" || address==="" || zip==="" || city==="" || wharehouseId==="" || rowsPerHour===null || numberOfDays===null){
            return setError("Tous les champs ne sont pas remplis!")
        }
        if(isNaN(rowsPerHour) || isNaN(numberOfDays)) {
            return setError("Les champs nombre de rdv/heure et nombre de jour planifiés doivent être des chiffres")
        }

        //récupération des states dans datas + envoie des données vers l'api
        let datas = {
            name: name,
            address: address,
            zip: zip,
            city: city,
            rowsPerHour: rowsPerHour,
            numberOfDays: numberOfDays,
            wharehouseId: wharehouseId
        }
        axios.post(`${configApi.api_url}/api/addCustomer`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            if(response.status === 200) {
                setRedirect(true)
            }
        })
        .catch((error) => {
            console.log('addCustomerBdd err', error) 
            setError("Impossible d'enregistrer le client, veuillez recommencer")
        })
    }



    return (
        <>
            {/*retour à la page admin si redirect est true*/}
            {redirect && <Redirect to='/admin' />}

            <Authorized />

            <div className="AddMod">

                <h1 className="AddMod-title">ajout d'un client charvin logistics</h1>

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

                <label className="AddMod-label input-upper">ville</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setCity(e.currentTarget.value)
                }}/>

                <label className="AddMod-label input-upper">nb de rdv autorisés par heure</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setRowsPerHour(e.currentTarget.value)
                }}/>

                <label className="AddMod-label input-upper">nb de jours planifiables par semaine</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setNumberOfDays(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">entrepôt d'affectation</label>
                <select 
                name="entrepôt"
                className="AddMod-select select-upper"
                onChange={(e) => {
                    setWharehouseId(e.currentTarget.value)
                }}>
                    <option className="AddMod-select-option">--Choisissez un entrepôt--</option>

                    {wharehouses.map((wharehouse) => {
                        return(
                            <option
                            className="AddMod-select-option"
                            key={wharehouse.id}
                            value={wharehouse.id}>{wharehouse.name}</option>
                        )}
                    )}
                </select>

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
