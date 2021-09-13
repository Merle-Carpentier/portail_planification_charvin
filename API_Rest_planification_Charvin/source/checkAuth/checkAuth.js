const jwt  = require('jsonwebtoken')
const key = require('./key')

//Middleware d'authentification 

module.exports = (req, res, next) => {
    //on pointe le jeton dans l'entête
    const authorization = req.headers.authorization

    //on vérifie s'il y a un jeton dans l'entête http, si non gestion erreur 401
    if(!authorization) {
        const message = "Vous n'avez pas de jeton d'autorisation dans l'entête"
        return res.status(401).json({ message })
    }

    //on extrait le jeton de l'entête
    const token = authorization.split('')[1]
    //on vérifie si le jeton est correct ou si non on gère l'erreur 401 (fonction flechée à 2 arguments)
    const decodedToken = jwt.verifiy(token, key, (error, decodedToken) => {
        if(error) {
            const message = "Utilisateur non autorisé à cet accès"
            return res.status(401).json({ message, data: error })
        }
        //on vérifie si c'est le bon utilisateur sinon gestion erreur 401
        const userId = decodedToken.userId
        if(req.boby.userId && req.boby.userId !== userId) {
            const message = "L'identifiant de cet utilisateur est invalide"
            return res.status(401).json({ message })
        }else{
            next() // si tout est ok, authentification validée
        }
    })
}