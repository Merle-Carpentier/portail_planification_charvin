const { Wharehouse } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de création d'un entrepôt
module.exports = (app) => {
    app.post('/api/addWharehouse', checkAuth, (req, res) => {
        Wharehouse.create(req.body)
            .then(wharehouse => {
                const message = `L'entrepôt ${req.body.name} a bien été créé`
                res.json({ message, data: wharehouse })
            })
            .catch(error => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error})
                }
                const message = `L'entrepôt n'a pas pu être créé, veuillez réessayer`
                res.status(500).json({message, data: error})
            })
    })
}