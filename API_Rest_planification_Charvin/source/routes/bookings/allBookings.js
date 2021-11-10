const { Booking, User, Customer, Wharehouse } = require('../../sequelize')
const { Op, Sequelize } = require('sequelize')

//s'agissant d'une route get, et l'utilisateur venant de se connecter, pas besoin du middleware
//route de récupération de tous les rdv avec leur entrepot + client attitrés ainsi que l'utilisateur ayant créée le rdv
module.exports = (app) => {
    app.get('/api/allBookings', (req, res) => {
        Booking.findAll({
            where: {
                //rdv égales ou supérieures à la date du jour
                startDateTime:{ [Op.gte]: Sequelize.fn('CURRENT_DATE') }
            },
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
            order: ['startDateTime']
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