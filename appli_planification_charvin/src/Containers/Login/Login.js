import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../apiCalls/usersCalls'
import charvin from '../../asset/Charvin_Logistics.jpg'

import './Login.css'

//page login de l'utilisateur

export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [errorConnection, setErrorConnection] = useState(null)

    const onSubmitForm = () => {
        let data = {
            email: email,
            password: password
        }

        loginUser(data)
        .then((response) => {
            console.log(response)

            if (response.status === 200) {
                window.localStorage.setItem('rdvCharvin', response.data.token)
                
                setRedirect(true)    
            }
        })
        .catch((error) => {
            console.log(error)
            
            setErrorConnection("Vos identifiants sont incorrects, recommencez ou contactez Charvin")

        })
    }


    return (
        <>
            {redirect && <Redirect to = "/"/>}
            <div className="login-container">

                <img className="login-container-img"src={charvin} alt="logo Charvin Logistics" />

                <h1>Bienvenue sur la plateforme de rendez-vous Charvin Logistics</h1>   
                

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
