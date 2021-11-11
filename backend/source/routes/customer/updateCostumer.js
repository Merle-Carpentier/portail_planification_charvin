const { Customer } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//Route de modification d'un client avec update + findByPk (pour vérifier son existence dans la bdd)
module.exports = (app) => {
    app.put('/api/updateCustumer/:id', checkAuth, (req, res) => {
        const id = req.params.id
        Customer.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Customer.findByPk(id)
            .then(customer => {
                if(customer === null) {
                    const message = `Le client demandé n'éxiste pas, veuillez réessayer avec un autre numéro client`
                    return res.status(404).json({ message })
                }
                const message = `Le client ${customer.name} a bien été modifié`
                res.json({ message, data: customer })
            })
        })
        //gestion des erreurs liés aux validateurs + contraintes et echec requête
        .catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            if(error instanceof UniqueConstraintError) {
                return res.status(400).json({ message: 'error.message', data: error })
            }
            const message = `Le client n'a pas pu être modifié, veuillez réessayer`
            res.status(500).json({ message, data: error })
        })
    })
}