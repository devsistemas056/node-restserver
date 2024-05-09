const {
    response
} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response)=>{
    
    const {id_token} = req.body;
    
    try {
         const {nombre, img, correo} = await googleVerify(id_token);

         let usuario = await Usuario.findOne({correo});
         if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            };
            usuario = new Usuario(data);
            await usuario.save();
         }
        
         // Si el usuario esta en estado:false en BD
        if (!usuario.estado) {
            return res.status(401).json({msg:'Hable con el administrador, usuatio bloqueado'});
         }
        
        // Generar Token
        const token = await jwt.generarJWT(usuario.id);

         res.status(200).json({ usuario, token });

    } catch (error) {
        res.status(400).json({ok: false, 
            msg: 'El token no se puede verificar'
        });
    }
};

module.exports = {
    login,
    googleSignIn
};