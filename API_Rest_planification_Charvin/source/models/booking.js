module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Booking', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La date et heure de début ne peut pas être vide' },
                notNull: { msg: 'La date et heure de début est une propriété requise' },
            }
        },
        end: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La date et heure de fin ne peut pas être vide' },
                notNull: { msg: 'La date et heure de fin est une propriété requise' }
            }
        },
        customClass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'La couleur ne peut pas être vide' },
                notNull: { msg: 'La couleur est une propriété requise' }
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom du rdv ne peut pas être vide' },
                notNull: { msg: 'Le nom du rdv est une propriété requise' },
            }
        },
        nbPal: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nombre de palettes du rdv ne peut pas être vide' },
                notNull: { msg: 'Le nombre de palettes du rdv est une propriété requise' },
            }
        },
        carrier: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le transporteur ne peut pas être vide' },
                notNull: { msg: 'Le transporteur est une propriété requise' }
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