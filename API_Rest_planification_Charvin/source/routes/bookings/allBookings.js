const { Booking, User, Customer, Wharehouse } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de récupération de tous les rdv avec leur entrepot + client attitrés ainsi que l'utilisateur ayant créée le rdv
module.exports = (app) => {
    app.get('/api/allBookings', checkAuth, (req, res) => {
        Booking.findAll({
            include: [{
                model: Wharehouse,
                attributes: ['id', 'name']
                },
                {
                model: Customer,
                attributes: ['id', 'name']
                },
                {
                model: User,
                attributes: ['id', 'lastName']
                }
            ],
            attributes: {exclude:['createdAt', 'updatedAt']},
            order: ['bookingDate', 'bookingTime']
        })
        .then(bookings => {
            const message = `La liste de rdv a bien été récupérée`
            res.json({message, data: bookings})
        })
        .catch(error => {
            const message = `La liste de rdv n'a pas pu être récupérée, réessayez`
            res.status(500).json({ message, data: error })
        })
    })
}