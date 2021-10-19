const { User } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//Route de modification d'un utilisateur avec update + findByPk (pour vérifier son existence dans la bdd)
module.exports = (app) => {
    app.put('/api/updateUser/:id', checkAuth, (req, res) => {
        const id = req.params.id
        User.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return User.findByPk(id)
            .then(user => {
                if(user === null) {
                    const message = `L'utilisateur' demandé n'éxiste pas, veuillez réessayer avec un autre numéro client`
                    return res.status(404).json({ message })
                }
                const message = `Le client ${user.name} a bien été modifié`
                res.json({ message, data: user })
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