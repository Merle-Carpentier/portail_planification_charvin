const { Customer, Wharehouse } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de récupération de tous les clients avec nom entrepôt
module.exports = (app) => {
    app.get('/api/detailCustomer/:id', checkAuth, (req, res) => {
        Customer.findByPk(req.params.id, {
            include: {
                model: Wharehouse,
                attributes: ['name']
            }
        })
            .then(customer => {
                if(customer === null) {
                    const message = `Le client demandé n'existe pas, donnez un autre identifiant`
                    return res.status(404).json({ message })
                }
                const message = `Le client a été trouvé`
                res.json({ message, data: customer })
            })
            .catch(error => {
                const message = `Le client n'a pas pu être récupéré, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}