import express from 'express';

const router = express.Router();

// Páginas do cliente
router.get('/site', (req, res) => {
    res.render('site/index');
});

router.get('/site/cardapio', (req, res) => {
    res.render('site/cardapio');
});

router.get('/site/reserva', (req, res) => {
    res.render('site/reserva');
});

router.get('/site/minhas-reservas', (req, res) => {
    res.render('site/minhas-reservas');
});

// Páginas administrativas
router.get('/admin', (req, res) => {
    res.render('site/admin-dashboard');
});

router.get('/admin/clientes', (req, res) => {
    res.render('site/admin-clientes');
});

router.get('/admin/mesas', (req, res) => {
    res.render('site/admin-mesas');
});

router.get('/admin/pratos', (req, res) => {
    res.render('site/admin-pratos');
});

router.get('/admin/reservas', (req, res) => {
    res.render('site/admin-reservas');
});

export default router;