const {DataTypes} = require('sequelize');
const slug = require("slug");
const shortid = require('shortid');
const {dbConnection} = require('../config/db');

const Projects = dbConnection.define('projects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    url: DataTypes.STRING
}, {
    hooks: {
        // Hook para crear y guardar slug en la DB
        beforeCreate(project) {
            const url = slug(project.name).toLowerCase();

            // Agregar id único al slug del proyecto
            project.url = `${url}-${shortid.generate()}`
        }
    }
});

module.exports = Projects;