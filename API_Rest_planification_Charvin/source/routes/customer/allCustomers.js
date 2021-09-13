const { Customer, Wharehouse } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//Route de récupération des clients avec nom entrepôt d'affectation
module.exports = (app) => {
    app.get('/api/allCustomers', checkAuth, (req, res) => {
        Customer.findAll({
            include: {
                model: Wharehouse,
                attributes: ['name']
            },
            attributes: {exclude:['createdAt', 'updatedAt']},
            order: ['wharehouseId', 'name']
        })
            .then(customers => {
                const message = `La liste de clients a bien été récupérée`
                res.json({message, data: customers})
            })
            .catch(error => {
                const message = `La liste des clients n'a pas pu être récupérée, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}