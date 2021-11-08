const { Booking } = require('../../sequelize')
const { ValidationError } = require('sequelize')
const checkAuth = require('../../checkAuth/checkAuth')

//route de création d'un rdv
module.exports = (app) => {
    app.post('/api/addBooking', checkAuth, (req, res) => {
        Booking.create(req.body)
            .then(booking => {
                const message = `Le rdv ${req.body.name} a bien été créé`
                res.json({ message, data: booking })
            })
            //gestion des erreurs liés aux validateurs + contraintes et echec requête
            .catch(error => {
                if(error instanceof ValidationError) {
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = `Le rdv n'a pas pu être ajouté, veuillez réessayer`
                res.status(500).json({ message, data: error })
            })
    })
}