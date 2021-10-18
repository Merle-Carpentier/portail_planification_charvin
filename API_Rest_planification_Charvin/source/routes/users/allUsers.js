const { User, Wharehouse, Customer } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de récupération de tous les utilisateurs avec leur entrepôt et client affecté
module.exports = (app) => {
    app.get('/api/allUsers', checkAuth, (req, res) => {
        User.findAll({
            include: [{
                model: Wharehouse,
                attributes: ['id', 'name']
                },
                {
                model: Customer,
                attributes: ['id', 'name']
                }
            ],
            attributes: {exclude:['password','createdAt', 'updatedAt']},
            order: ['lastName', 'wharehouseId', 'customerId']
        })
        .then(users => {
            const message = `La liste d'utilisateurs a bien été récupérée`
            res.json({message, data: users})
        })
        .catch(error => {
            const message = `La liste d'utilisateurs n'a pas pu être récupérée, réessayez`
            res.status(500).json({ message, data: error })
        })
    })
}