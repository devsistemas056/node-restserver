const { response } = require("express");

const esAdminRole = (req, res = response, next)=>{
    if (!req.usuarioAutenticado) {
        return res.status(500).json({msg: 'Se requiere verificar el role sin validar el token primero'});
    }

    const {rol, nombre} = req.usuarioAutenticado;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({msg: 'El usuario no es ADMIN ROL, no puede realizar esta accion'});
    }

    next();
}

const tieneRol = (...roles)=>{
    return (req, res= response, next)=>{
        if (!req.usuarioAutenticado) {
            return res.status(500).json({msg: 'Se requiere verificar el role sin validar el token primero'});
        }

        const  rol  = req.usuarioAutenticado.rol;
        if (!roles.includes(rol)) {
            return res.status(401).json({msg: `El servicio requiere uno de estos roles: ${roles}`});
        }
        next();
    };

}

module.exports = {esAdminRole, tieneRol};