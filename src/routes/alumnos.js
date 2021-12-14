const express = require('express');
const router = express.Router();
const multer  = require('multer');
const path = require('path');
const {v4} = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname,"..","..","public/uploads"),
    filename: (req, file,cb)=>{
        const originalName = file.originalname;
        const exten = path.extname(originalName);
        console.log(file);
        const filename = `${v4()}${exten}`;
        cb(null, filename);
    }
});
const upload = multer({ 
    storage,
    dest: path.join(__dirname,"..","..","public/uploads")
});

const alumnoController = require('../controllers/alumnoController')

router.get('/',alumnoController.list);
router.get('/export',alumnoController.export);
router.post('/agregar',upload.single('foto'),alumnoController.agregar);
router.get('/eliminar/:id',alumnoController.eliminar);
router.get('/actualizar/:id',alumnoController.ver);
router.get('/actualizar/:id/:sid',alumnoController.ver);
router.post('/actualizar/:id',upload.single('foto'),alumnoController.actualizar);
router.post('/actualizar/:id/:sid',upload.single('foto'),alumnoController.actualizar);

module.exports = router;