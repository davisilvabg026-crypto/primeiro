import Prato from '../models/prato.js';
import Curso from '../models/curso.js';
import Aluno from '../models/aluno.js';
import Reserva from '../models/reserva.js';

export default class SiteController {
    constructor() {

        this.home = (req, res) => {
            res.render('site/index');
        };

     this.cardapio = async (req, res) => {
            try {
                const pratos = await Prato.find({});
                res.render('site/cardapio', { pratos });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar o cardápio.');
            }
        };
        this.reserva = async (req, res) => {
            try {
                const clientes = await Curso.find({});
                const mesas = await Aluno.find({ status: 'livre' });

                res.render('site/reserva', { clientes, mesas });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar a página de reservas.');
            }
        };

        this.salvarReserva = async (req, res) => {
            try {
                const { nome, telefone, email, pessoas, dataHora } = req.body;

                let cliente = await Curso.findOne({ telefone });
                if (!cliente) {
                    cliente = await Curso.create({ nome, telefone, email });
                }

                let mesa = await Aluno.findOne({
                    status: 'livre',
                    capacidade: { $gte: Number(pessoas) }
                });

                if (!mesa) {
                    mesa = await Aluno.findOne({}) || await Aluno.create({
                        nome: `Mesa ${pessoas} Lugares`,
                        capacidade: Number(pessoas),
                        status: 'reservada'
                    });
                }

                await Reserva.create({
                    cliente: cliente._id,
                    mesa: mesa._id,
                    dataHora: new Date(dataHora)
                });

                await Aluno.findByIdAndUpdate(mesa._id, { status: 'reservada' });

                res.redirect('/site/minhas-reservas');
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao salvar a reserva.');
            }
        };

        this.minhasReservas = async (req, res) => {
            try {
                const reservas = await Reserva.find({})
                    .populate('cliente')
                    .populate('mesa');

                res.render('site/minhas-reservas', { reservas });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar as reservas.');
            }
        };

        this.dashboard = async (req, res) => {
            try {
                const totalClientes = await Curso.countDocuments();
                const totalMesas = await Aluno.countDocuments();
                const totalPratos = await Prato.countDocuments();
                const totalReservas = await Reserva.countDocuments();

                res.render('site/admin-dashboard', {
                    totalClientes,
                    totalMesas,
                    totalPratos,
                    totalReservas
                });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar o painel.');
            }
        };

        this.clientes = async (req, res) => {
            try {
                const clientes = await Curso.find({});
                res.render('site/admin-clientes', { clientes });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar os clientes.');
            }
        };

        this.mesas = async (req, res) => {
            try {
                const mesas = await Aluno.find({});
                res.render('site/admin-mesas', { mesas, mesaEdit: null });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar as mesas.');
            }
        };

        this.editarMesaForm = async (req, res) => {
            try {
                const mesas = await Aluno.find({});
                const mesaEdit = await Aluno.findById(req.params.id);
                res.render('site/admin-mesas', { mesas, mesaEdit });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar mesa para edição.');
            }
        };

        this.salvarMesa = async (req, res) => {
            try {
                const { id, nome, capacidade, status } = req.body;
                const dados = {
                    nome,
                    capacidade: Number(capacidade),
                    status
                };

                if (id) {
                    await Aluno.findByIdAndUpdate(id, dados);
                } else {
                    await Aluno.create(dados);
                }

                res.redirect('/admin/mesas');
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao salvar a mesa.');
            }
        };

        this.excluirMesa = async (req, res) => {
            try {
                await Aluno.findByIdAndDelete(req.params.id);
                res.redirect('/admin/mesas');
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao excluir a mesa.');
            }
        };

        this.pratos = async (req, res) => {
            try {
                const pratos = await Prato.find({});
                res.render('site/admin-pratos', { pratos });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar os pratos.');
            }
        };

        this.reservas = async (req, res) => {
            try {
                const reservas = await Reserva.find({})
                    .populate('cliente')
                    .populate('mesa');

                res.render('site/admin-reservas', { reservas });
            } catch (erro) {
                console.error(erro);
                res.status(500).send('Erro ao carregar as reservas.');
            }
        };
    }
}