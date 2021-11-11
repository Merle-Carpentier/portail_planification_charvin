const { User } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')
const bcrypt = require('bcryptjs')
const saltRounds = 10


//route de modification du mot de passe utilisateur, cryptage du mdp avec bcrypt
module.exports = (app) => {
    app.put('/api/updateUserPassword/:id', checkAuth, (req,res) => {
        const id = req.params.id
        bcrypt.hash(req.body.password, saltRounds)
        .then(hash => {
            User.update(
                { password: hash },
                {where: {id: id}}
            )
            const message = `Le mot de passe de cet utilisateur a bien été modifié`
            res.json({ message })
        }) 
        .catch(error => {
            const message = `Le mot de passe n'a pas pu être modifié, veuillez réessayer`
            res.status(500).json({ message, data: error })
        })
        
    })
}