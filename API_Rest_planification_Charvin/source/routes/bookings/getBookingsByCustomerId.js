const { Booking } = require('../../sequelize')
const { Op, Sequelize } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route d'affichage des rdv à partir de la date du jour avec l'id client
module.exports = (app) => {
    app.get('/api/bookingsByCustomer/:id', checkAuth, (req, res) => {
        const customerId = req.params.id
        Booking.findAll({
            where: {
                customerId: customerId,
                startDateTime:{ [Op.gte]: Sequelize.fn('CURRENT_DATE') }
            },
            attributes: {exclude: ['createdAt', 'updatedAt']},
            order: ['start']
        })
        .then(bookingsCustomer => {
            //console.log("bookingCust", bookingsCustomer)
            const message = `La liste de rdv du client portant l'identifiant ${bookingsCustomer[0].customerId} a bien été récupérée`
            res.json({ message, data: bookingsCustomer})
        })
        .catch(error => {
            const message = `La liste de rdv n'a pas pu être récupérée, réessayez`
            res.status(500).json({ message, data: error })
        })
    })
}