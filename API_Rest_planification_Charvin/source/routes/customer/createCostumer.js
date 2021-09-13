const { Customer } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//Route de création d'un client avec create
module.exports = (app) => {
    app.post('/api/addCustomer', checkAuth, (req, res) => {
        Customer.create(req.body)
            .then(customer => {
                const message = `Le client ${req.body.name} a bien été créé`
                res.json({ message, data: customer })
            })
            //gestion des erreurs liés aux validateurs + contraintes et echec requête
            .catch(error => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                if(error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error })
                }
                const message = `Le client n'a pas pu être ajouté, veuillez réessayer`
                res.status(500).json({ message, data: error })
            })
    })
}