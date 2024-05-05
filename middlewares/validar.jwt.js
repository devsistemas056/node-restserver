const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res= response, next)=>{
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ "msg": "No hay token en la petición"});
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        
        if (!usuario) {
            return res.status(401).json({msg: 'Token no valido - usuario no existe en BD'});
        }

        // Verificar si el usuario tiene el estado:true
        if (!usuario.estado) {
            return res.status(401).json({msg: 'Token no valido - usuario con estado: false'});
        }
        
        req.usuarioAutenticado = usuario;
        req.uid = uid;

        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({ "msg": "Token no valido"});
    }
}

module.exports = {validarJWT}