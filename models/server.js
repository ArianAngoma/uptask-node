const path = require('path');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.path = {
            index: ''
        }

        // Middlewares
        this.middlewares();

        // Rutas de la app
        this.routes();
    }


    middlewares() {
        // CORS
        this.app.use(cors());

        // Morgan
        this.app.use(morgan('dev'));

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

        // Habilitar vista
        this.app.set('view engine', 'pug');

        // Añadir carpetas de vistas
        this.app.set('views', path.join(__dirname, '../views'))
    }

    routes() {
        this.app.use(this.path.index, require('../routes/home'));
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;