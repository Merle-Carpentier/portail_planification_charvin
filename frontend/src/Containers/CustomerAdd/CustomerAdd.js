import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'


const token = localStorage.rdvCharvin

//page de formulaire d'ajout d'un client
export default function CutomerAdd() {

    //initialisation des states du formulaire + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [rowsPerHour, setRowsPerHour] = useState()
    const [wharehouseId, setWharehouseId] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)
    const [redirectLog, setRedirectLog] = useState(false)

    //je sélectionne mes tableaux Wharehouses et Customers dans le store
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses) 

    //const pour dispatch des actions
    const dispatch = useDispatch()

    //fonction d'envoi du formulaire
    const onSubmitForm = () => {
        //message d'erreur si les champs ne sont remplis
        if(name==="" || address==="" || zip==="" || city==="" || wharehouseId==="" || rowsPerHour===null){
            return setError("Tous les champs ne sont pas remplis!")
        }
        if(isNaN(rowsPerHour)) {
            return setError("Le champ nombre de rdv/heure doit être des chiffres")
        }

        //récupération des states dans datas + envoie des données vers l'api
        let datas = {
            name: name,
            address: address,
            zip: zip,
            city: city,
            rowsPerHour: rowsPerHour,
            wharehouseId: wharehouseId
        }
        axios.post(`${configApi.api_url}/api/addCustomer`, datas, {headers: {Authorization: `Bearer ${token}`}})
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
            console.log('addCustomerBdd err', error) 
            setError("Impossible d'enregistrer le client, veuillez recommencer")
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
