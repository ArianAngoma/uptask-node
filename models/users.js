const {DataTypes} = require('sequelize');
const bcryptjs = require('bcryptjs');
const {dbConnection} = require('../config/db');
const Projects = require('../models/projects');

const Users = dbConnection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: 'Correo es requerido'
            },
            isEmail: {
                msg: 'Correo no válido'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Password es requerido'
            }
        }
    }
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcryptjs.hashSync(user.password, bcryptjs.genSaltSync());
        }
    }
});

Users.hasMany(Projects);

module.exports = Users;