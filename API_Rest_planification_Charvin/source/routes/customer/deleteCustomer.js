const { Customer } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de suppression d'un client (on extrait d'abord le client concerné avec findByPk)
module.exports = (app) => {
    app.delete('/api/deleteCustomer/:id', checkAuth, (req, res) => {
        Customer.findByPk(req.params.id)
            .then(customer => {
                if(customer === null) {
                    const message = `Le client demandé n'existe pas, utilisez un autre identifiant`
                    return res.status(404).json({ message })
                }
                return Customer.destroy({ where: {id: customer.id} })
                    .then(_ => {
                        const message = `Le client portant l'id ${customer.id} a été supprimé`
                        res.json({ message, data: customer })
                    })
            })
            .catch(error => {
                const message = `Le client n'a pas pu être supprimé, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}