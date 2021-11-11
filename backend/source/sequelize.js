const { Sequelize, DataTypes } = require('sequelize')


//importation des modèles
const CustomerModel = require('./models/customer')
const WharehouseModel = require('./models/wharehouse')
const UserModel = require('./models/user')
const BookingModel = require('./models/booking')


//connexion à la bdd en vérifiant si l'environnement est localhost ou heroku (pas encore finalisé sur Heroku)
let sequelize
if(process.env.NODE_ENV === 'production') {      
    sequelize = new Sequelize('nom dbheroku', 'nom user', 'password', {
        host: 'blabla',
        dialect: 'mariadb',
        logging: false
    })
}else{
    sequelize = new Sequelize('planification_charvin','root','', {
        host: 'localhost',
        dialect: 'mariadb',
        logging: false
    })
}

//connexion bdd
sequelize.authenticate()
.then(_ => {
    console.log("Connexion à la base de données OK")
})
.catch((error) => {
    console.log("Impossible de se connecter à la bdd", error)
})


//récupération des modèles
const Wharehouse = WharehouseModel(sequelize, DataTypes)
const Customer = CustomerModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Booking = BookingModel(sequelize, DataTypes)

//association des champs wharehouseId
Customer.belongsTo(Wharehouse, { foreignKey: 'wharehouseId', onDelete: 'RESTRICT' })
User.belongsTo(Wharehouse, { foreignKey: 'wharehouseId', onDelete: 'RESTRICT' })
Booking.belongsTo(Wharehouse, { foreignKey: 'wharehouseId', onDelete: 'RESTRICT' })
Wharehouse.hasMany(Customer, { foreignKey: 'wharehouseId', onDelete: 'RESTRICT' })
Wharehouse.hasMany(User, { foreignKey: 'wharehouseId', onDelete: 'RESTRICT' })
Wharehouse.hasMany(Booking, { foreignKey: 'wharehouseId', onDelete: 'RESTRICT' })

//association des champs customerId
User.belongsTo(Customer, { foreignKey: 'customerId', onDelete: 'RESTRICT' })
Booking.belongsTo(Customer, { foreignKey: 'customerId', onDelete: 'RESTRICT' })
Customer.hasMany(User, { foreignKey: 'customerId', onDelete: 'RESTRICT' })
Customer.hasMany(Booking, { foreignKey: 'customerId', onDelete: 'RESTRICT' })
 
//association du champ userId
Booking.belongsTo(User, { foreignKey: 'userId', onDelete: 'RESTRICT' })
User.hasMany(Booking, { foreignKey: 'userId', onDelete: 'RESTRICT' })



//initialisation de la base de données (création tables + 1 ligne par table)
const initDb = () => {

    //synchronisation des tables et affichage du message
    return sequelize.sync()
        .then(_ => {
            console.log("La base de données à bien été initialisée")
        })
        .catch(error => {
            console.log("L\'initialisation de le bdd a echouée", error)
        })
}

//exportation de l'initialisation et des modèles
module.exports = {
    initDb, Customer, Wharehouse, User, Booking
}

