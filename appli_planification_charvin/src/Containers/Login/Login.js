import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadUserInfo } from '../../redux/actions/userActions'
import charvin from '../../asset/Charvin_Logistics.jpg'
import axios from "axios"
import { configApi } from '../../apiCalls/configApi'
import './Login.css'

//page login de l'utilisateur

export default function Login() {

    //initialisation des states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [errorConnection, setErrorConnection] = useState(null)


    //initialisation du dispatch au store
    const dispatch = useDispatch()
 
    //fonction d'appel à l'api
    const onSubmitForm = () => {
        
        //envoi du formulaire à l'api
        let data = {
            email: email,
            password: password
        }
        

        axios.post(`${configApi.api_url}/api/login`, data)
        .then((response) => {
            //code à traiter si la requête est ok
            if (response.status === 200) {
                //console.log("login response.data",response)
                let datasUser = {
                    id: response.data.data.id,
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName,
                    email: response.data.data.email,
                    role: response.data.data.role,
                    wharehouseId: response.data.data.wharehouseId,
                    customerId: response.data.data.customerId
                }

                //envoi du token et des infos utilisateur dans le local storage
                localStorage.rdvCharvin = response.data.token
                localStorage.userCharvin = response.data.data.id
                       
                //dispatch de l'action au store avec stockage des infos user dans le store
                dispatch(loadUserInfo(datasUser))
               
                //redirection vers la page principale
                setRedirect(true)    
            }
        })
        //gestion de l'erreur
        .catch((error) => {
            console.log(error)
            setErrorConnection("Vos identifiants sont incorrects, recommencez ou contactez Charvin")
        })
        
    }

   
    //affichage de la page avec une redirection au conditionnel
    return (
        <>
            {redirect && <Redirect to = "/booking"/>}

            <div className="login-container">
            {/* {console.log('userInfo', infos)} */}
                <div className="login-container-title">
                    <img className="login-container-img"src={charvin} alt="logo Charvin Logistics" />
                    <h1 className="login-container-h1">Bienvenue sur la plateforme de rendez-vous Charvin Logistics</h1>   
                </div>

                <form 
                className="login-form"
                onSubmit= {(e)=> {
                    e.preventDefault()
                    onSubmitForm()
                }}>

                    <h2>Pour accéder à la prise de rdv, veuillez vous connecter</h2>

                    {errorConnection !== null && <p className="login-errMsg">{errorConnection}</p>}

                    <label>Votre email</label>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="exemple@mail.com"
                        name="email"
                        onChange= {(e)=> {
                            setEmail(e.currentTarget.value)
                        }}
                    />

                    <label>Votre mot de passe</label>
                    <input
                        className="login-input"
                        type="password"
                        name="password"
                        onChange= {(e)=> {
                            setPassword(e.currentTarget.value)
                        }}
                    />

                    <input
                        className="login-form-button"
                        type="submit"
                        value="S'identifier"
                    />

                </form>
                
            </div>
                
        </>
    )
}