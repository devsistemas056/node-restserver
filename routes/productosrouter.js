const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const {
    validarCampos,
    validarJWT,
    esAdminRole
} = require('../middlewares'); // Por defecto buscara el archuvi index.js o se puede agregar a la referencia('/index')

const { productoGetAll, productoGetById, productoCreate, productoUpdate, productoDelete } = require('../controllers/productocontroller');

const {
    existeProductoById,
    existeCategoriaById
} = require('../helpers/db-validators');

const router = Router();
/* *********************************************************** */
router.get('/', productoGetAll);
/* *********************************************************** */
router.get('/:id',
    [
        check('id', 'No es un id de Mongo Valido').isMongoId(),
        check('id').custom(existeProductoById),
        validarCampos
    ],
    productoGetById);
/* *********************************************************** */
router.post('/', [
    validarJWT,
    check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo Valido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    validarCampos
],
productoCreate
);
/* *********************************************************** */
router.put('/:id', [
    validarJWT,
    check('id', 'No es un id de Mongo Valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productoUpdate);
/* *********************************************************** */
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeProductoById),
    validarCampos
], productoDelete);


module.exports = router