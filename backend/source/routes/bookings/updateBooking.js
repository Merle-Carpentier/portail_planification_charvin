const { Booking } = require('../../sequelize')
const { ValidationError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de modification d'un rdv avec update + findOne (pour vérifier existence du _id dans la bdd)
module.exports = (app) => {
    app.put('/api/updateBooking/:id', checkAuth, (req, res) => {
        Booking.findOne({where: {_id: req.params.id}})
        .then((booking) => {
            if(booking === null) {
                const message = `Le rdv demandé n'existe pas, utilisez un autre identifiant`
                return res.status(404).json({ message })
            }
            return Booking.update(req.body, { where: {_id: booking._id} })
            .then(_ => {
                const message = `Le rdv ${booking.name} a bien été modifié`
                res.json({ message, data: booking })
            })
        })
        //gestion des erreurs liés aux validateurs et echec requête
        .catch(error => {
            if(error instanceof ValidationError) {
                return res.status(400).json({ message: error.message, data: error })
            }
            const message = `Le rdv n'a pas pu être modifié, veuillez réessayer`
            res.status(500).json({ message, data: error })
        })
        
    })
}