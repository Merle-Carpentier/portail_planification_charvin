module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bookingDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La date ne peut pas être vide' },
                notNull: { msg: 'La date est une propriété requise' },
                isDate: { msg: 'un format date est requis' }
            }
        },
        bookingTime: {
            type: DataTypes.TIME,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'heure ne peut pas être vide' },
                notNull: { msg: 'L\'heure est une propriété requise' }
            }
        },
        natureBooking: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le type de rdv ne peut pas être vide' },
                notNull: { msg: 'Le type de rdv est une propriété requise' }
            }
        },
        bookingName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom du rdv ne peut pas être vide' },
                notNull: { msg: 'Le nom du rdv est une propriété requise' },
            }
        },
        refNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La référence rdv ne peut pas être vide' },
                notNull: { msg: 'La référence rdv est une propriété requise' }
            }
        },
        paletsQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La quantité ne peut pas être vide' },
                notNull: { msg: 'La quantité est une propriété requise' }
            }
        },
        carrierSupplier: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le fournisseur ou transporteur ne peut pas être vide' },
                notNull: { msg: 'Le fournisseur ou transporteur est une propriété requise' }
            }
        },
        wharehouseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'identifiant entrepôt ne peut pas être vide' },
                notNull: { msg: 'L\'identifiant entrepôt est une propriété requise' }
            }
        },
        customerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'identifiant client ne peut pas être vide' },
                notNull: { msg: 'L\'identifiant client est une propriété requise' }
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'L\'identifiant utilisateur ne peut pas être vide' },
                notNull: { msg: 'L\'identifiant utilisateur est une propriété requise' }
            }
        }
    })

}