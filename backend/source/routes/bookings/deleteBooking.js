const { Booking } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')


//route de suppression d'un rdv (on extrait d'abord le client concerné avec findByPk)
module.exports = (app) => {
    app.delete('/api/deleteBooking/:id', checkAuth, (req, res) => {
        Booking.findOne({where: {_id: req.params.id}})
            .then(booking => {
                if(booking === null) {
                    const message = `Le rdv demandé n'existe pas, utilisez un autre identifiant`
                    return res.status(404).json({ message })
                }
                return Booking.destroy({ where: {_id: booking._id} })
                    .then(_ => {
                        const message = `Le rdv  ${booking.name} a été supprimé`
                        res.json({ message, data: booking })
                    })
            })
            .catch(error => {
                const message = `Le rdv n'a pas pu être supprimé, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}