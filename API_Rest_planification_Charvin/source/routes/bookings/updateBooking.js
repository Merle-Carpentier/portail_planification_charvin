const { Booking } = require('../../sequelize')
const { ValidationError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de modification d'un rdv avec update + findByPk (pour vérifier son existence dans la bdd)
module.exports = (app) => {
    app.put('/api/updateBooking/:id', checkAuth, (req, res) => {
        const id = req.params.id
        Booking.update(req.body, {
            where: { id: id }
        })
        .then(_ => {
            return Booking.findByPk(id)
            .then(booking => {
                if(booking === null) {
                    const message = `Le rdv demandé n'éxiste pas, veuillez réessayer avec un autre numéro de rdv`
                    return res.status(404).json({ message })
                }
                const message = `Le rdv ${booking.bookingName} a bien été modifié`
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