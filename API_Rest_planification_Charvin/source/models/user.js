module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le prénom ne peut pas être vide' },
                notNull: { msg: 'Le prénom est une propriété requise' }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le nom ne peut pas être vide' },
                notNull: { msg: 'Le nom est une propriété requise' }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: 'L\'email est déjà pris'
            },
            validate: {
                notEmpty: { msg: 'L\'email ne peut pas être vide' },
                notNull: { msg: 'L\'email est une propriété requise' },
                isEmail: { msg: 'Le champ est de type email' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le mot de passe ne peut pas être vide' },
                notNull: { msg: 'Le mot de passe est une propriété requise' }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Le role ne peut pas être vide' },
                notNull: { msg: 'Le role est une propriété requise' }
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
        }
    })
    
}

