const express = require('express');
const router = express.Router();


const sedeController = require('../controllers/sedeController')

router.get('/',sedeController.list);
router.post('/agregar',sedeController.agregar);
router.get('/eliminar/:id',sedeController.eliminar);
router.get('/actualizar/:id',sedeController.ver);
router.post('/actualizar/:id',sedeController.actualizar);

module.exports = router;