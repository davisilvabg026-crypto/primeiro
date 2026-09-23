import express from 'express';

const router = express.Router();

import ReservaController from '../controllers/ReservaController.js'

const controle = new ReservaController();

const caminhobase = 'reserva/'

router.get('/' + caminhobase + 'add', controle.openAdd)

router.post('/' + caminhobase + 'add', controle.add)

router.get('/' + caminhobase + 'lst', controle.list)

router.post('/' + caminhobase + 'lst', controle.find)

router.get('/' + caminhobase + 'edt/:id', controle.openEdt)

router.post('/' + caminhobase + 'edt/:id', controle.edt)

router.get('/' + caminhobase + 'del/:id', controle.del)

export default router