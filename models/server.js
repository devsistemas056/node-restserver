const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        // Middlewares
        this.middleware();

        
        // Rutas de mi aplicacion
        this.routes();
    }

    middleware(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosRoutePath, require('../routes/userrouter'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`app ejecutandose en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;