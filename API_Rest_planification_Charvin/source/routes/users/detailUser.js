const { User, Wharehouse, Customer } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de récupération d'un utilisateur avec son id
module.exports = (app) => {
    app.get('/api/detailUser/:id', checkAuth, (req, res) => {
        User.findByPk(req.params.id, {
            include: [{
                model: Wharehouse,
                attributes: ['id', 'name']
                },
                {
                model: Customer,
                attributes: ['id', 'name']
                }
            ],
            attributes: {exclude:['password']} 
        })
            .then(user => {
                if(user === null) {
                    const message = `L'utilisateur demandé n'existe pas, donnez un autre identifiant`
                    return res.status(404).json({ message })
                }
                const message = `L'utilisateur a été trouvé`
                res.json({ message, data: user })
            })
            .catch(error => {
                const message = `L'utilisateur n'a pas pu être récupéré, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}
