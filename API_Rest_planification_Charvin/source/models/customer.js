module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'Le nom client est déjà pris'
            },
            validate: {
                notEmpty: { msg: 'Le nom ne peut pas être vide' },
                notNull: { msg: 'Le nom est une propriété requise' }
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'adresse ne peut pas être vide' },
                notNull: { msg: 'L\'adresse est une propriété requise' }
            }
        },
        zip: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le code postal ne peut pas être vide' },
                notNull: { msg: 'Le code postal est une propriété requise' }
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La ville ne peut pas être vide' },
                notNull: { msg: 'La ville est une propriété requise' }
            }
        },
        rowsPerHour: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nombre de plage par heure ne peut pas être vide' },
                notNull: { msg: 'Le nombre de plage par heure est une propriété requise' }
            }
        },
        numberOfDays: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nombre de jour d\'ouverture ne peut pas être vide' },
                notNull: { msg: 'Le nombre de jour d\'ouverture est une propriété requise' }
            }
        },
        wharehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'identifiant entrepôt ne peut pas être vide' },
                notNull: { msg: 'L\'identifiant entrepôt est une propriété requise' }
            }
        }  
    })
    
}