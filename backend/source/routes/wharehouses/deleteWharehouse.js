const { Wharehouse } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de suppression d'un entrepôt (on extrait d'abord l'entrepôt concerné avec findByPk)
module.exports = (app) => {
    app.delete('/api/deleteWharehouse/:id', checkAuth, (req, res) => {
        Wharehouse.findByPk(req.params.id)
            .then(wharehouse => {
                if(wharehouse === null) {
                    const message = `L'entrepôt demandé n'existe pas, utilisez un autre identifiant`
                    return res.status(404).json({ message })
                }
                return Wharehouse.destroy({ where: {id: wharehouse.id} })
                    .then(_ => {
                        const message = `L'entrepôt portant l'id ${wharehouse.id} a été supprimé`
                        res.json({ message, data: wharehouse })
                    })
            })
            .catch(error => {
                const message = `L'entrepôt n'a pas pu être supprimé, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}
