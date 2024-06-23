// Este archivo incluye todos los archivos middleware
// para que luego se instancie solo este archivo
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar.jwt');
const validarRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validarRoles
};