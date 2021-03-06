const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {dbConnection} = require('../config/db');
const {varDump} = require('../helpers/db-data');

// Importar el modelo
require('../models/projects');
require('../models/tasks');
require('../models/users');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            projects: '',
            tasks: '',
            users: ''
        }

        // Conección a la base de datos
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }

    async connectDB() {
        try {
            await dbConnection.sync();
            console.log('La conexión se ha establecido correctamente.');
        } catch (error) {
            console.error('No se puede conectar a la base de datos: ', error);
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Morgan
        this.app.use(morgan('dev'));

        // Habilitar body-parser para leer datos del formulario
        this.app.use(express.urlencoded({extended: true}));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Habilitar vista
        this.app.set('view engine', 'pug');

        // Añadir carpetas de vistas
        this.app.set('views', path.join(__dirname, '../views'));

        // Pasar var dump a la aplicación
        this.app.use((req, res, next) => {
            res.locals.varDump = varDump;
            next();
        });
    }

    routes() {
        this.app.use(this.path.projects, require('../routes/projects'));
        this.app.use(this.path.tasks, require('../routes/tasks'));
        this.app.use(this.path.users, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;