const { Booking } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de suppression d'un rdv (on extrait d'abord le client concerné avec findByPk)
module.exports = (app) => {
    app.delete('/api/deleteBooking/:id', checkAuth, (req, res) => {
        Booking.findByPk(req.params.id)
            .then(booking => {
                if(booking === null) {
                    const message = `Le rdv demandé n'existe pas, utilisez un autre identifiant`
                    return res.status(404).json({ message })
                }
                return Booking.destroy({ where: {id: booking.id} })
                    .then(_ => {
                        const message = `Le rdv portant l'id ${booking.id} a été supprimé`
                        res.json({ message, data: booking })
                    })
            })
            .catch(error => {
                const message = `Le client n'a pas pu être supprimé, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}