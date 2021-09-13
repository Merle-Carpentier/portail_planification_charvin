const { User } = require('../../sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')
const bcrypt = require('bcrypt')
const saltRounds = 10

//Route de modification d'un utilisateur avec update + findByPk (pour vérifier son existence dans la bdd)
//cryptage du mdp avec bcrypt
module.exports = (app) => {
    app.put('/api/updateUser/:id', checkAuth, (req, res) => {
        const id = req.params.id
        bcrypt.hash(req.body.password, saltRounds)
            .then(hash => {
                return User.update({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    role: req.body.role,
                    wharehouseId: req.body.wharehouseId,
                    customerId: req.body.customerId
                },
                { where: { id: id } })
            })
                .then(_ => {
                    return User.findByPk(id)
                    .then(user => {
                        if(user === null) {
                            const message = `L'utilisateur demandé n'éxiste pas, veuillez réessayer avec un autre numéro utilisateur`
                            return res.status(404).json({ message })
                        }
                        const message = `L'utilisateur ${user.firstName} a bien été modifié`
                        res.json({ message, data: user })
                    })
                })
                .catch(error => {
                    if(error instanceof ValidationError) {
                        return res.status(400).json({ message: error.message, data: error })
                    }
                    if(error instanceof UniqueConstraintError) {
                        return res.status(400).json({ message: 'error.message', data: error })
                    }
                    const message = `L'utilisateur n'a pas pu être modifié, veuillez réessayer`
                    res.status(500).json({ message, data: error })
                })
            .catch(error => {
                const message = `Il y a eu un problème, veuillez réessayer`
                res.status(500).json({ message, data: error })
            })
    })
}