import Reserva from '../models/reserva.js'
import Curso from '../models/curso.js'
import Aluno from '../models/aluno.js'

export default class ReservaController {

    constructor(caminhoBase = 'reserva/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res) => {

            const clientes = await Curso.find({})
            const mesas = await Aluno.find({})

            res.render(caminhoBase + "add", {
                Clientes: clientes,
                Mesas: mesas
            })
        }

        this.add = async(req, res) => {

            await Reserva.create({
                cliente: req.body.cliente,
                mesa: req.body.mesa,
                dataHora: req.body.dataHora
            })

            res.redirect('/' + caminhoBase + 'lst')
        }

        this.list = async(req, res) => {

            const resultado = await Reserva.find({})
                .populate('cliente')
                .populate('mesa')

            res.render(caminhoBase + 'lst', {
                Reservas: resultado
            })
        }

        this.find = async(req, res) => {

            const filtro = req.body.filtro

            const clientes = await Curso.find({
                nome: {
                    $regex: filtro,
                    $options: "i"
                }
            })

            const idsClientes = clientes.map(cliente => cliente._id)

            const resultado = await Reserva.find({
                cliente: {
                    $in: idsClientes
                }
            })
            .populate('cliente')
            .populate('mesa')

            res.render(caminhoBase + 'lst', {
                Reservas: resultado
            })
        }

        this.del = async(req, res) => {

            await Reserva.findByIdAndDelete(req.params.id)

            res.redirect('/' + caminhoBase + 'lst')
        }
    }
}