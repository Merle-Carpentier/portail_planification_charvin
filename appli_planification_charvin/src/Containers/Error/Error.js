import error from '../../asset/error.png'
import { Link } from 'react-router-dom'
import './Error.css'

//page d'erreur 404
export default function Error() {
    return (
        <div className="error-404">

            <img classname="error-404-img" src={error} alt="logo erreur 404" />

            <h1 className="error-404-title">
                Erreur 404!
            </h1>
            <h2 className="error-404-title2">
                Aucune ressource n'a été trouvée à cette page, veuillez vérifier l'url
            </h2>

            <Link to="/" className="error-404-link">Retour à la page d'accueil</Link>
            
        </div>
    )
}
