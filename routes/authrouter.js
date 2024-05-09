const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/logincontroller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
        check('correo', 'Correo ingresado no es valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ],
    login
);

router.post('/google',[
        check('id_token', 'id_token no valido').not().isEmpty(),
        validarCampos
    ],
    googleSignIn)

module.exports = router;