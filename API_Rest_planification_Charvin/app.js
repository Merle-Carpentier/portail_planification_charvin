const express = require('express')
const favicon = require('serve-favicon')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require('./source/sequelize')

const app = express()
const port = process.env.PORT || 8000

//utilisation de morgan pour le développement (à retirer lorsque l'on n'est plus en phase de développement) + on parse les url + on sécurise les requêtes avec cors
app
.use(favicon(__dirname + '/favicon.ico'))
.use(cors())
.use(morgan('dev'))
.use(express.urlencoded({ extended: true }))
.use(express.json())

//initialisation de la bdd
sequelize.initDb()

//acquisition de la page "home"
app.get('/', (req, res) => res.json( "Bienvenue sur API REST portail planification Charvin" ))

// ici tous les endpoints
require('./source/routes/wharehouses/createWharehouse')(app)
require('./source/routes/wharehouses/updateWharehouse')(app)
require('./source/routes/wharehouses/allWharehouses')(app)
require('./source/routes/wharehouses/detailWharehouse')(app)
require('./source/routes/wharehouses/deleteWharehouse')(app)
require('./source/routes/customer/createCostumer')(app)
require('./source/routes/customer/updateCostumer')(app)
require('./source/routes/customer/allCustomers')(app)
require('./source/routes/customer/detailCustomer')(app)
require('./source/routes/customer/deleteCustomer')(app)
require('./source/routes/users/createUser')(app)
require('./source/routes/users/updateUser')(app)
require('./source/routes/users/updateUserPassword')(app)
require('./source/routes/users/allUsers')(app)
require('./source/routes/users/detailUser')(app)
require('./source/routes/users/login')(app)
require('./source/routes/users/deleteUser')(app)
require('./source/routes/bookings/createBooking')(app)
require('./source/routes/bookings/updateBooking')(app)
require('./source/routes/bookings/getBookingsByCustomerId')(app)
require('./source/routes/bookings/allBookings')(app)
require('./source/routes/bookings/getBookingsByWharehouseId')(app)
require('./source/routes/bookings/detailBooking')(app)
require('./source/routes/bookings/deleteBooking')(app)


//gestion des erreurs 404
app.use(({res}) => {
    const message = "Impossible de trouver la ressource demandé, veuillez essayer une autre URL svp"
    res.status(404).json({message})
})

//écoute du port
app.listen(port, ()=> 
    console.log(`API portail planification Charvin démarrée sur le port ${port}`)  
)
