import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage
});

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