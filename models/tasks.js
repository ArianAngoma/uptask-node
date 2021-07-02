const {DataTypes} = require('sequelize');
const {dbConnection} = require('../config/db');
const Projects = require('../models/projects');

const Tasks = dbConnection.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING(100),
    state: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

// Tarea pertenece a Proyectos
Tasks.belongsTo(Projects);

// Proyecto tiene muchas Tareas - también se puede usar
/* Projects.hasMany(Tasks); */

module.exports = Tasks;