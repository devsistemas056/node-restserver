const { response } = require("express");
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');


const usuariosGetAll = async(req, res = response)=>{
    //const { filter = '', page = 1, limitpage = 10 } = req.query;
    const { limite = 5 , desde = 5} = req.query;
    const query = {estado:true};
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));    
    // const total = await Usuario.countDocuments(query);

    // Promise.all: permite ejecutar todos las procesas a la vez y si una genera error, no termina el proceso
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        usuarios
    });
};

const usuariosPost = async(req, res = response)=>{
      
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);    

    // Guardar en BD
    await usuario.save();
    res.status(200).json({
        usuario
    });
};

const usuariosUpdate = async(req, res = response)=>{
    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;
    // TODO: validar contra base de datos

    if (password) {
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    res.status(200).json({
        msg: "PUT API - Controllers",
        usuario
    });
};

const usuariosDelete = async(req, res = response)=>{
    const { id } = req.params;
    
    // Eliminacion Fisica:
    // const usuario = await Usuario.findByIdAndDelete(id);
    // Eliminacion logica:
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    const usuarioAutenticado = req.usuarioAutenticado;
    
    res.status(200).json({usuario, usuarioAutenticado});
};


module.exports = {
    usuariosGetAll,
    usuariosPost,
    usuariosUpdate,
    usuariosDelete
}