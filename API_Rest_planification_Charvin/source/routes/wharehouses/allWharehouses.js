const { Wharehouse } = require('../../sequelize')


//s'agissant d'une route get, et l'utilisateur venant de se connecter, pas besoin du middleware
//route de récupération de tous les entrepôts
module.exports = (app) => {
    app.get('/api/allWharehouses', (req, res) => {
        Wharehouse.findAll({ order: ['name']})
            .then(wharehouses => {
                const message = `Les entrepôts ont bien été récupérés`
                res.json({ message, data: wharehouses })
            })
            .catch(error => {
                const message = `La liste des entrepôts n'a pas pu être récupérée, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}