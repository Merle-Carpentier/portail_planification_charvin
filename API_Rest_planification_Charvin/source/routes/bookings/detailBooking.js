const { Booking, Customer, Wharehouse, User } = require('../../sequelize')


//s'agissant d'une route get, et l'utilisateur venant de se connecter, pas besoin du middleware
//route de récupération de tous les rdv avec nom entrepôt, client et utilisateur
module.exports = (app) => {
    app.get('/api/detailBooking/:id', (req, res) => {
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