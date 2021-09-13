const { User } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de suppression d'un utilisateur (on extrait d'abord l'utilisateur concerné avec findByPk)
module.exports = (app) => {
    app.delete('/api/deleteUser/:id', /*checkAuth, */(req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                if(user === null) {
                    const message = `L'utilisateur demandé n'existe pas, utilisez un autre identifiant`
                    return res.status(404).json({ message })
                }
                return User.destroy({ where: {id: user.id} })
                    .then(_ => {
                        const message = `L'utilisateur portant l'id ${user.id} a été supprimé`
                        res.json({ message, data: user })
                    })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être supprimé, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}