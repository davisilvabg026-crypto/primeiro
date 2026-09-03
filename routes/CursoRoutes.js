import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }

});

const upload = multer({ storage: storage });

import CursoController from '../controllers/CursoController.js'

const controle = new CursoController();

const caminhobase = 'curso/'

router.get('/' + caminhobase + 'add', controle.openAdd)

router.post('/' + caminhobase + 'add', upload.single('imagem'), controle.add)

router.get('/' + caminhobase + 'lst', controle.list)

router.post('/' + caminhobase + 'lst', controle.find)

router.get('/' + caminhobase + 'del/:id', controle.del)

router.get('/' + caminhobase + 'edt/:id', controle.openEdt)

router.post('/' + caminhobase + 'edt/:id', upload.single('imagem'), controle.edt)

export default router