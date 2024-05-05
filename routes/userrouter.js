const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar.jwt');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
const {
    validarCampos,
    validarJWT,
    esAdminRole, tieneRol
} = require('../middlewares');       // Por defecto buscara el archuvi index.js o se puede agregar a la referencia('/index')

const {
    validaRole,
    validaSiExisteEmail,
    validaSiExisteUsuarioById
} = require('../helpers/db-validators')

const {
    usuariosGetAll,
    usuariosPost,
    usuariosUpdate,
    usuariosDelete
} = require('../controllers/usercontroller');



const router = Router();

router.get('/', usuariosGetAll);

router.post('/', [
    check('nombre', 'El nombres es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras').isLength({
        min: 6
    }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validaSiExisteEmail),
    // check('rol', 'El Rol no es valido no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //check('rol').custom((rol='')=>validaRole(rol) ), // cuando es solo un parametro se puede usar de esta forma, o como sigue en la siguiente linea
    check('rol').custom(validaRole),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validaSiExisteUsuarioById),
    //check('rol', 'Debe ingresar Role').isEmpty(),
    check('rol').custom(validaRole),
    validarCampos
], usuariosUpdate);

router.delete('/:id', [
    validarJWT,
    esAdminRole,    // Este middlware bloque si no es AMDMIN_ROLE
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),  // Y este middleware bloquea si el usuario autenticado no tiene uno de esos roles indicados
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(validaSiExisteUsuarioById),
    validarCampos
], usuariosDelete);

module.exports = router