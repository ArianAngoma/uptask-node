const {DataTypes} = require('sequelize');
const {dbConnection} = require('../config/db');

const Projects = dbConnection.define('projects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    url: DataTypes.STRING
});

module.exports = Projects;