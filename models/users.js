const {DataTypes} = require('sequelize');
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
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Users.hasMany(Projects);

module.exports = Users;