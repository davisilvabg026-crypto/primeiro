import express from 'express';
import SiteController from '../controllers/SiteController.js';

const router = express.Router();
const controller = new SiteController();

router.get('/site', controller.home);
router.get('/site/cardapio', controller.cardapio);
router.get('/site/reserva', controller.reserva);
router.post('/site/reserva', controller.salvarReserva);
router.get('/site/minhas-reservas', controller.minhasReservas);

router.get('/admin', controller.dashboard);
router.get('/admin/clientes', controller.clientes);

router.get('/admin/mesas', controller.mesas);
router.post('/admin/mesas', controller.salvarMesa);
router.get('/admin/mesas/editar/:id', controller.editarMesaForm);
router.post('/admin/mesas/excluir/:id', controller.excluirMesa);

router.get('/admin/pratos', controller.pratos);
router.get('/admin/reservas', controller.reservas);

export default router;