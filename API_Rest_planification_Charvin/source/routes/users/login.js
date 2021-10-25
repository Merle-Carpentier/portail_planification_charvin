const { User } = require('../../sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const key = require('../../checkAuth/key')

//route de login utilisateur avec génération d'un jeton jwt
module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        //vérification existence de l'utilisateur
        User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if(!user) {
                const message = `L'utilisateur annoncé n'existe pas`
                return res.status(404).json({ message })
            }
            //vérification du mdp avec bcrypt
            return bcrypt.compare(req.body.password, user.password)
            .then(validPassword => {
                if(!validPassword) {
                    const message = `Mot de passe incorrect`
                    return res.status(401).json({ message })
                }
                //génération d'un jeton jwt pendant 10h
                const token = jwt.sign( { userId: user.id }, key, { expiresIn: '10h' } )
                const message = `L'utilisateur s'est connecté avec succès`
    
                //console.log('token de login ds back', token)
                return res.json({ message, data: user, token })  
            })
        })
        .catch(error => {
            const message = `L'utilisateur n'a pas pu être connecté, veuillez réessayer`
            res.status(500).json({ message, data: error })
        })
    })
}