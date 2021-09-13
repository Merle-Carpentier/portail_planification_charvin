const { User } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')
const bcrypt = require('bcrypt')
const saltRounds = 10

//route de création d'un utilisateur
//cryptage du mdp avec bcrypt
module.exports = (app) => {
    app.post('/api/addUser', /*checkAuth, */(req, res) => {
        bcrypt.hash(req.body.password, saltRounds)
            .then(hash => {
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role,
                    wharehouseId: req.body.wharehouseId,
                    customerId: req.body.customerId
                })
                    .then(user => {
                        const message = `L'utilisateur ${req.body.firstName} a bien été créé`
                        res.json({ message, data: user })
                    })
                    //gestion des erreurs liés aux validateurs + contraintes et echec requête
                    .catch(error => {
                        if(error instanceof ValidationError) {
                            return res.status(400).json({ message: error.message, data: error })
                        }
                        if(error instanceof UniqueConstraintError) {
                            return res.status(400).json({ message: 'error.message', data: error })
                        }
                        const message = `L'utilisateur n'a pas pu être ajouté, veuillez réessayer`
                        res.status(500).json({ message, data: error })
                    })
            })
            .catch(error => {
                const message = `Il y a eu un problème, veuillez réessayer`
                res.status(500).json({ message, data: error })
            })
            
    })
}