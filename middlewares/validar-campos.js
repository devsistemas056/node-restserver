const { validationResult } = require("express-validator");

// En las funciones middleware se agrega el parametro next y se ejecuta al ultimo de la funcion 
// para indicar que la funcion se ejecuto correctamente y siga el proceso.
const validarCampos = (req, res, next) => {
    // Valida si hay errores de los campos indicados en el router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = {
    validarCampos
}