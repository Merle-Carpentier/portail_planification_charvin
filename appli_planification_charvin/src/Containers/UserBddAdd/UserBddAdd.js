import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Authorized from '../../Components/Authorized/Authorized.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'
import { allWharehouses } from '../../redux/actions/wharehouseActions.js'
import { allCustomers } from '../../redux/actions/customerActions.js'

const token = window.localStorage.getItem('rdvCharvin')
const userId = window.localStorage.getItem('userId')

//page de formulaire d'ajout d'un entrepôt
export default function UserBddAdd() {

    //initialisation des states du formulaire + message erreur + redirection
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [wharehouseId, setWharehouseId] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [role, setRole] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    //je sélectionne mes tableaux Wharehouses et Customers dans le store
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses) 
    const customers = useSelector(state => state.customerReducer.customers)

    //j'initialise mon dispatch d'actions
    const dispatch = useDispatch()

    //fonction d'envoi du formulaire
    const onSubmitForm = () => {
        //message d'erreur si les champs ne sont remplis
        if(lastName==="" || firstName==="" || email==="" || password==="" || checkPassword==="" || wharehouseId==="" || customerId===""){
            return setError("Tous les champs ne sont pas remplis!")
        }
        //message d'erreur si les 2 mots de passe ne sont pas identiques
        if(password !== checkPassword) {
            return setError("Vous n'avez pas écrit les mêmes mot de passe!")
        }

        //récupération des states dans datas + envoie des données vers l'api
        let datas = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            role: role,
            wharehouseId: wharehouseId,
            customerId: customerId,
        }
        axios.post(`${configApi.api_url}/api/addUser`, datas, {headers: {"x-access-token": token, "userId": userId}})
        .then((response) => {
            if(response.status === 200) {
                setRedirect(true)
            }
        })
        .catch((error) => {
            console.log('addUserBdd err', error) 
            setError("Impossible d'enregistrer l'utilisateur, veuillez recommencer")
        })
    }

    //je lance mes actions du store pour obtenir les infos des entrepôts et des clients
    useEffect(() => {
        dispatch(allWharehouses())
        dispatch(allCustomers())   
    }, [])


    return (
        <>
            {/*retour à la page admin si redirect est true*/}
            {redirect && <Redirect to='/admin' />}

            <Authorized />

            <div className="AddMod">

                <h1 className="AddMod-title">ajout d'un utilisateur charvin logistics</h1>

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
                    setLastName(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">prénom</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setFirstName(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">email</label>
                <input 
                type="text"
                className="AddMod-input"
                onChange={(e) => {
                    setEmail(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">mot de passe</label>
                <input 
                type="password"
                className="AddMod-input"
                onChange={(e) => {
                    setPassword(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">confirmation mot de passe</label>
                <input 
                type="password"
                className="AddMod-input"
                onChange={(e) => {
                    setCheckPassword(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">entrepôt d'affectation</label>
                <select 
                name="Cliquez pour choisir"
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

                <label className="AddMod-label">client d'affectation</label>
                <select 
                name="entrepôts"
                className="AddMod-select"
                onChange={(e) => {
                    setCustomerId(e.currentTarget.value)
                }}>
                    <option className="AddMod-select-option">--Choisissez un client--</option>

                    {customers.map((customer) => {
                        return(
                            <option
                            className="AddMod-select-option"
                            key={customer.id}
                            value={customer.id}>{customer.name}</option>
                        )}
                    )}
                </select>

                <label className="AddMod-label">rôle</label>
                <select
                name="clients"
                className="AddMod-select"
                onChange={(e) => {
                    setRole(e.currentTarget.value)
                }}>
                    <option className="AddMod-select-option">--Choisissez un role utilisateur--</option>
                    <option className="AddMod-select-option" value="user">user</option>
                    <option className="AddMod-select-option" value="charvin">charvin</option>
                    <option className="AddMod-select-option" value="admin">admin</option>
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
