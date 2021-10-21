const jwt  = require('jsonwebtoken')
const key = require('../checkAuth/key')
const checkAuth = require('../checkAuth/checkAuth')

//route de vérification de validité du token

module.exports = (app) => {
    app.get('/api/checkToken', checkAuth, (req, res) => {
        //on pointe le jeton dans l'entête
        const token = req.headers['x-access-token']

        //on verifie le token
        const verif = jwt.verify(token, key, (error, decodedToken) => {
            if(error) {
                const message = "Token invalide"
                return res.status(401).json({ message, data: error })
            }
            const message = `Token authentifié`
            res.json({ message, data: decodedToken.UserId })
        })
        
    })

}
