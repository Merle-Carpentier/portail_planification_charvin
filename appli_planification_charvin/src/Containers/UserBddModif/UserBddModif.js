import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Authorized from '../../Components/Authorized/Authorized.js'
import { logoutUser } from '../../redux/actions/userActions.js'
import axios from 'axios'
import { configApi } from '../../apiCalls/configApi.js'
import '../../asset/cssCommun/pages_finissant_en_Add_ou_Modif.css'

const token = localStorage.rdvCharvin

//page de formulaire d'ajout d'un entrepôt
export default function UserBddModif(props) {

    //initialisation des states du formulaire + message erreur + redirection
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [wharehouseName, setWharehouseName] = useState("")
    const [wharehouseId, setWharehouseId] = useState("")
    const [customerName, setCustomerName] = useState("")
    const [customerId, setCustomerId] = useState("")
    const [password, setPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [error, setError] = useState(null)
    const [redirect, setRedirect] = useState(false)

    let id = props.match.params.id

    //je prends mon state wharehouses et customers dans le store
    const wharehouses = useSelector(state => state.wharehouseReducer.wharehouses)
    const customers = useSelector(state => state.customerReducer.customers)

    //const pour appel action store
    const dispatch = useDispatch()

    //fonction de récupération d'un client
    const getUser = (usId) => {
        axios.get(`${configApi.api_url}/api/detailUser/${usId}`, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            //console.log("get dans userModif", response)
            setLastName(response.data.data.lastName)
            setFirstName(response.data.data.firstName)
            setEmail(response.data.data.email)
            setRole(response.data.data.role)
            setWharehouseName(response.data.data.Wharehouse.name)
            setWharehouseId(response.data.data.Wharehouse.id)
            setCustomerName(response.data.data.Customer.name)
            setCustomerId(response.data.data.Customer.id)
        })
        .catch((error) => {
            console.log('modifUser err', error) 
            setError("Impossible d'afficher l'utilisateur, tentez de rafraîchir la page svp")
        })
    }

    //fonction d'envoi du formulaire
    const onSubmitForm = () => {
        //message d'erreur si les champs ne sont remplis
        if(lastName==="" || firstName==="" || email==="" || role ==="" || wharehouseId==="" || customerId===""){
            return setError("Tous les champs ne sont pas remplis!")
        }
        //récupération des states dans datas + envoie des données vers l'api
        let datas = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            wharehouseId: wharehouseId,
            customerId: customerId,
        }

        axios.put(`${configApi.api_url}/api/updateUser/${id}`, datas, {headers: {Authorization: `Bearer ${token}`}})
        .then((response) => {
            if(response.status === 200) {
                setRedirect(true)
            }
        })
        .catch((error) => {
            if(error.status === 403) {
                dispatch(logoutUser()) //si status 403, erreur dans le token donc deconnexion
            }
            console.log('modif user err', error) 
            setError("Impossible de modifier l'utilisateur', veuillez recommencer")
        })
    }

    //fonction de modification du mot de passe
    const onSubmitChangePassword = (userId) => {

        if(password !== checkPassword) {
            return setError("Les deux mots de passe ne sont pas identiques!")
        }else if(password==="" || checkPassword==="") {
            return setError("Un ou deux champs ne sont pas remplis!")
        }else {
            let data = {
                password: password
            }
            axios.put(`${configApi.api_url}/api/updateUserPassword/${userId}`, data, {headers: {Authorization: `Bearer ${token}`}})
            .then((response) => {
                if(response.status === 200) {
                    setRedirect(true)
                }
            })
            .catch((error) => {
                console.log('modif passworduser err', error) 
                setError("Impossible de modifier le mot de passe utilisateur', veuillez recommencer")
            })
        }


    }


    //Chargement des infos au chargement du composant
    useEffect(() => {
        
        getUser(id)

    }, [])


    return (
        <>
            {/*retour à la page admin si redirect est true*/}
            {redirect && <Redirect to='/admin' />}

            <Authorized />            

            <div className="AddMod">

                <h1 className="AddMod-title">modification d'un utilisateur charvin logistics</h1>

                {/*affichage du message d'erreur*/}
                {error !== null && <p className="AddMod-error">{error}</p>}

                {/*formulaire de modification*/}
                <form 
                className="AddMod-form"
                onSubmit = {(e) => {
                    e.preventDefault()
                    onSubmitForm()
                }}>

                <label className="AddMod-label">nom</label>
                <input 
                type="text"
                value= {lastName}
                className="AddMod-input input-upper"
                onChange={(e) => {
                    setLastName(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">prénom</label>
                <input 
                type="text"
                value= {firstName}
                className="AddMod-input"
                onChange={(e) => {
                    setFirstName(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">email</label>
                <input 
                type="text"
                value= {email}
                className="AddMod-input"
                onChange={(e) => {
                    setEmail(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">role</label>
                <select
                name="role"
                className="AddMod-select"
                onChange={(e) => {
                    setRole(e.currentTarget.value)
                }}>
                    <option
                        className="AddMod-select select-upper"
                        defaultValue = {role}
                        >{role}</option>
                    <option className="AddMod-select select-upper" value="user">user</option>
                    <option className="AddMod-select select-upper" value="charvin">charvin</option>
                    <option className="AddMod-select select-upper" value="admin">admin</option>
                </select>

                <label className="AddMod-label">client d'affectation</label>
                <select 
                name="client"
                className="AddMod-select select-upper"
                onChange={(e) => {
                    setCustomerId(e.currentTarget.value)
                }}>
                    <option
                    className="AddMod-select select-upper"
                    defaultValue = {customerId}
                    >{customerName}</option>
                   
                    {customers.map((cust) => {
                        return(
                            <option
                            className="AddMod-select-option"
                            key={cust.id}
                            value={cust.id}>{cust.name}</option>
                        )
                    })
                    }    
                </select>

                <label className="AddMod-label">entrepôt d'affectation</label>
                <select 
                name="entrepôt"
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

                {/**Formulaire de modification du mot de passe */}
                <form 
                className="AddMod-form"
                onSubmit = {(e) => {
                    e.preventDefault()
                    onSubmitChangePassword(id)
                }}>

                <h2 className="AddMod-title2 input-upper">modification du mot de passe</h2>

                <label className="AddMod-label">nouveau mot de passe</label>
                <input 
                type="password"
                value= {password}
                className="AddMod-input"
                onChange={(e) => {
                    setPassword(e.currentTarget.value)
                }}/>

                <label className="AddMod-label">confirmation nouveau mot de passe</label>
                <input 
                type="password"
                value= {checkPassword}
                className="AddMod-input"
                onChange={(e) => {
                    setCheckPassword(e.currentTarget.value)
                }}/>

                <input
                className="AddMod-input-submit"
                type="submit"
                name="Envoyer"
                value="MODIFIER" />

                </form>
                
            </div>
        </>
    )
}
