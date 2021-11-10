const { Booking } = require('../../sequelize')
const { Op, Sequelize } = require('sequelize')


//s'agissant d'une route get, et l'utilisateur venant de se connecter, pas besoin du middleware
//route d'affichage des rdv à partir de la date du jour avec l'id entrepôt
module.exports = (app) => {
    app.get('/api/bookingsByWharehouse/:id', (req, res) => {
        const wharehouseId = req.params.id
        Booking.findAll({
            where: {
                wharehouseId: wharehouseId,
                startDateTime:{ [Op.gte]: Sequelize.fn('CURRENT_DATE') }
            },
            attributes: {exclude: ['createdAt', 'updatedAt']},
            order: ['startDateTime']
        })
        .then(bookingsWharehouse => {
            const message = `La liste de rdv de l'entrepôt portant l'identifiant ${bookingsWharehouse[0].wharehouseId} a bien été récupérée`
            res.json({ message, data: bookingsWharehouse})
        })
        .catch(error => {
            const message = `La liste de rdv n'a pas pu être récupérée, réessayez`
            res.status(500).json({ message, data: error })
        })
    })
}