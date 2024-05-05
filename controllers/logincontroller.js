const {
    response
} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('../helpers/generar-jwt');

const login = async (req, res = response) => {
    
    const {correo, password} = req.body;
    try {
        const usuario = await Usuario.findOne({correo});
        // Verificar si existe el usuario
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
              });
        }

        // Verificar si el usuario esta habilitado {estado: boolean}
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado:false"
              });
        }

        // Verificar si la constraseña es correcta
        const verificaPassword =  bcryptjs.compareSync(password, usuario.password);
        if (!verificaPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password"
              });
        }

        // Generar Token
        const token = await jwt.generarJWT(usuario.id);


        res.status(200).json({
            usuario,
            token
          });
    } catch (error) {
        // console.log(`Error en Login: ${error}`);
        res.status(500).json({
            msg: `Error en Login: ${error}`,
          });
    }
};

module.exports = {
    login
};