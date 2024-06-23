const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Definir los endpoint
        this.path = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        // Conectar a Base de datos:
        this.conectarDb();

        // Middlewares:
        this.middleware();

        // Rutas de mi aplicacion:
        this.routes();
    }

    async conectarDb() {
        await dbConnection();
    }

    middleware(){
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes(){
        // Definir o relacionar los endpoint y los router
        this.app.use(this.path.auth, require('../routes/authrouter'));
        this.app.use(this.path.buscar, require('../routes/buscarrouter'));
        this.app.use(this.path.categorias, require('../routes/categoriasrouter'));
        this.app.use(this.path.productos, require('../routes/productosrouter'));
        this.app.use(this.path.usuarios, require('../routes/userrouter'));

    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`app ejecutandose en http://localhost:${this.port}`);
        });
    }
}

module.exports = Server;