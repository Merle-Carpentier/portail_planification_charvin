const jwt  = require('jsonwebtoken')
const key = require('./key')

//Middleware d'authentification lors des requêtes

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorization
  
    if(!authorizationHeader) {
      const message = `Vous n'avez pas de jeton d'authentification dans l'en-tête de la requête.`
      return res.status(403).json({ message })
    }
    
    const token = authorizationHeader.split(' ')[1]
    const payload = jwt.verify(token, key)
    const userId = payload.userId

    if (!payload) {
      const message = `L'utilisateur non autorisé à cette ressource.`
      return res.status(403).json({ message, data: error })
    } else if (req.body.userId && req.body.userId !== userId) {
      const message = `L'identifiant de l'utilisateur est invalide.`
      res.status(403).json({ message })
    } else {
      next()
    }   
}