import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'

const token = localStorage.rdvCharvin
const userId = localStorage.userCharvin

//page de formulaire d'ajout d'un entrepôt
export default function CustomerModif(props) {

    //initialisation des states du formulaire + message erreur + redirection
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [rowsPerHour, setRowsPerHour] = useState()
    const [numberOfDays, setNumberOfDays] = useState()
    const [wharehouseName, setWharehouseName] = useState("")
    const [wharehouseId, setWharehouseId] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    let id = props.match.params.id

    //je prends mon state wharehouses dans le store
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses)

    //const pour dispatch des actions
    const dispatch = useDispatch()

    //fonction de récupération d'un client
    const getCustomer = (custId) => {
        axios.get(`${configApi.api_url}/api/detailCustomer/${custId}`, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            //console.log("get dans customerModif", response)
            setName(response.data.data.name)
            setAddress(response.data.data.address)
            setZip(response.data.data.zip)
            setCity(response.data.data.city)
            setRowsPerHour(response.data.data.rowsPerHour)
            setNumberOfDays(response.data.data.numberOfDays)
            setWharehouseName(response.data.data.Wharehouse.name)
            setWharehouseId(response.data.data.Wharehouse.id)
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('modif customer err', error) 
            setError("Impossible d'afficher le client, tentez de rafraîchir la page svp")
        })
    }

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

        axios.put(`${configApi.api_url}/api/updateCustumer/${id}`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            if(response.status === 200) {
                setRedirect(true)
            }
        })
        .catch((error) => {
            console.log('modif customer err', error) 
            setError("Impossible d'enregistrer le client, veuillez recommencer")
        })
    }



    //Chargement des infos au chargement du composant
    useEffect(() => {
        
        getCustomer(id)

    }, [])


    return (
        <>
            {/*retour à la page admin si redirect est true*/}
            {redirect && <Redirect to='/admin' />}

            <Authorized />            

            <div className="AddMod">

                <h1 className="AddMod-title">modification d'un client charvin logistics</h1>

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
                value= {name}
                className="AddMod-input input-upper"
                onChange={(e) => {
                    setName(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">adresse</label>
                <input 
                type="text"
                value= {address}
                className="AddMod-input"
                onChange={(e) => {
                    setAddress(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">code postal</label>
                <input 
                type="text"
                value= {zip}
                className="AddMod-input"
                onChange={(e) => {
                    setZip(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">ville</label>
                <input 
                type="text"
                value= {city}
                className="AddMod-input input-upper"
                onChange={(e) => {
                    setCity(e.currentTarget.value)
                }}/>

                <label className="AddMod-label input-upper">nb de rdv autorisés par heure</label>
                <input 
                type="text"
                value={rowsPerHour}
                className="AddMod-input"
                onChange={(e) => {
                    setRowsPerHour(e.currentTarget.value)
                }}/>

                <label className="AddMod-label input-upper">nb de jours planifiables par semaine</label>
                <input 
                type="text"
                value={numberOfDays}
                className="AddMod-input"
                onChange={(e) => {
                    setNumberOfDays(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">entrepôt d'affectation</label>
                <select 
                name="Cliquez pour choisir"
                className="AddMod-select select-upper"
                onChange={(e) => {
                    setWharehouseId(e.currentTarget.value)
                }}>
                
                    <option
                    className="AddMod-select select-upper"
                    defaultValue = {wharehouseId}
                    >{wharehouseName}</option>
                   
                    {wharehouses.map((whareh) => {
                        return(
                            <option
                            className="AddMod-select-option"
                            key={whareh.id}
                            value={whareh.id}>{whareh.name}</option>
                        )
                    })
                        
                    }    
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
