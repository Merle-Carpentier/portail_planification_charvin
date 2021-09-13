const { Wharehouse } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de récupération d'un entrepôt vec son id
module.exports = (app) => {
    app.get('/api/detailWharehouse/:id', checkAuth, (req, res) => { 
        Wharehouse.findByPk(req.params.id)
            .then(wharehouse => {
                if(wharehouse === null) {
                    const message = `L'entrepôt demandé n'existe pas, donnez un autre identifiant`
                    return res.status(404).json({ message })
                }
                const message = `L'entrepôt a été trouvé`
                res.json({ message, data: wharehouse })
            })
            .catch(error => {
                const message = `L'entrepôt n'a pas pu être récupéré, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}