const { Router } = require('express');
const { usuariosGetAll, usuariosPost, usuariosUpdate, usuariosDelete } = require('../controllers/usercontroller');

const router = Router();

router.get('/', usuariosGetAll);

router.post('/', usuariosPost);

router.put('/:id', usuariosUpdate);

router.delete('/',usuariosDelete);

module.exports = router