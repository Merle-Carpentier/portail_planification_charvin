const { Wharehouse } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de mise à jour d'un entrepôt avec son id
module.exports = (app) => {
    app.put('/api/updateWharehouse/:id', checkAuth, (req, res) => {
        const id = req.params.id
        Wharehouse.update(req.body, { where: {id: id} })
            .then(_ => {
                return Wharehouse.findByPk(id)
                    .then(wharehouse => {
                        if(wharehouse === null) {
                            const message = `L'entrepôt demandé n'existe pas`
                            return res.status(404).json({ message })
                        }
                        const message = `L'entrepôt ${wharehouse.name} a bien été modifié`
                        res.json({ message, data: wharehouse })
                    })
            })
            .catch(error => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError) {
                    return res.status(400).json({ message: 'error.message', data: error})
                }
                const message = `L'entrepôt n'a pas pu être modifié, veuillez réessayer`
                res.status(500).json({message, data: error})
            })
    })
}