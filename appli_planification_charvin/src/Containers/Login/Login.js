import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserInfo } from '../../redux/actions/userActions'
import { loginUser } from '../../apiCalls/usersCalls'
import charvin from '../../asset/Charvin_Logistics.jpg'
import './Login.css'

//page login de l'utilisateur

export default function Login() {

    //initialisation des states
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [errorConnection, setErrorConnection] = useState(null)

    //const userInfos = useSelector(state => (state.userReducer.infos))

    //initialisation du dispatch au store
    const dispatch = useDispatch()
 
    //fonction d'appel à l'api
    const onSubmitForm = () => {
        
        //envoi du formulaire à l'api
        let data = {
            email: email,
            password: password
        }
        loginUser(data)

        //traitrement de la réponse de l'api
        .then((response) => {
            
            //variable qui servira de payload au dispatch
            let userInfos = response.data.data
            console.log('userInfo', userInfos)
            
            //code à traiter si la requête est ok
            if (response.status === 200) {

                //dispatch de l'action au store
                dispatch(
                    loadUserInfo(userInfos)
                )
                
                //envoi du token et des infos utilisateur dans le local storage
                window.localStorage.setItem('rdvCharvin', response.data.token)
                window.localStorage.setItem('utilisateurCharvin', [response.data.data.firstName, response.data.data.lastName, response.data.data.role])
               
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
            {redirect && <Redirect to = "/"/>}
            

            <div className="login-container">

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