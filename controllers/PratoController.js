import Prato from '../models/prato.js'

export default class PratoController {

    constructor(caminhoBase = 'prato/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res) => {
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res) => {
            await Prato.create({
                nome: req.body.nome,
                categoria: req.body.categoria,
                disponivel: req.body.disponivel === 'true'
            });

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.list = async(req, res) => {
            const resultado = await Prato.find({})
            res.render(caminhoBase + 'lst', {Pratos: resultado})
        }

        this.find = async(req, res) => {
            const filtro = req.body.filtro;

            const resultado = await Prato.find({
                nome: {
                    $regex: filtro,
                    $options: "i"
                }
            })

            res.render(caminhoBase + 'lst', {Pratos: resultado})
        }

        this.openEdt = async(req, res) => {
            const id = req.params.id

            const prato = await Prato.findById(id)

            res.render(caminhoBase + "edt", {
                Prato: prato
            })
        }

        this.edt = async(req, res) => {
            await Prato.findByIdAndUpdate(
                req.params.id,
                {
                    nome: req.body.nome,
                    categoria: req.body.categoria,
                    disponivel: req.body.disponivel === 'true'
                }
            )

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async(req, res) => {
            await Prato.findByIdAndDelete(req.params.id)

            res.redirect('/' + caminhoBase + 'lst');
        }
    }
}