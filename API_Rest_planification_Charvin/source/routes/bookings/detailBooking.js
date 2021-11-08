const { Booking, Customer, Wharehouse, User } = require('../../sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de récupération de tous les rdv avec nom entrepôt, client et utilisateur
module.exports = (app) => {
    app.get('/api/detailBooking/:id', checkAuth, (req, res) => {
        Booking.findByPk(req.params.id, {
            include: [{
                model: Wharehouse,
                attributes: ['name']
                },
                {
                model: Customer,
                attributes: ['name']
                },
                {
                model: User,
                attributes: ['firstName', 'lastName']
                }
            ],
            attributes: {exclude:['createdAt', 'updatedAt']},
            order: ['startDateTime']
        })
            .then(booking => {
                if(booking === null) {
                    const message = `Le rdv demandé n'existe pas, donnez un autre identifiant`
                    return res.status(404).json({ message })
                }
                const message = `Le rdv a été trouvé`
                res.json({ message, data: booking })
            })
            .catch(error => {
                const message = `Le rdv n'a pas pu être récupéré, réessayez`
                res.status(500).json({ message, data: error })
            })
    })
}