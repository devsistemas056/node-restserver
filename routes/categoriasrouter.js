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

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoriaById,
    actualizarCategoria,
    borrarCategoria
} = require('../controllers/categoriacontroller');
const {
    existeCategoriaById
} = require('../helpers/db-validators');


const router = Router();

/**
 * {{url}}/api/categorias
 */

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias);

// Obtener todas las categorias por id - publico
router.get('/:id',
    [
        check('id', 'No es un id de Mongo Valido').isMongoId(),
        check('id').custom(existeCategoriaById),
        validarCampos
    ],
    obtenerCategoriaById);

// Crear categoria - privado - cualquier eprsona con un token valido
router.post('/', [
        validarJWT,
        check('nombre', 'EL nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria
);

// Actualizar categoria - privado - cualquier eprsona con un token valido
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaById),
    validarCampos
], actualizarCategoria);

// Eliminar categoria - privado - cualquier persona con un token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
],borrarCategoria);

module.exports = router