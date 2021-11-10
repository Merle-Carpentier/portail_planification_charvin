const { User, Wharehouse, Customer } = require('../../sequelize')

//s'agissant d'une route get, et l'utilisateur venant de se connecter, pas besoin du middleware
//route de récupération de tous les utilisateurs avec leur entrepôt et client affecté
module.exports = (app) => {
    app.get('/api/allUsers', (req, res) => {
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