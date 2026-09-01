import Aluno from '../models/aluno.js'

export default class AlunoController {

    constructor(caminhoBase = 'aluno/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async(req, res) => {
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res) => {
            // cria o Aluno
            await Aluno.create({
                capacidade: Number(req.body.capacidade),
                status: req.body.status
            });

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.list = async(req, res) => {
            const resultado = await Aluno.find({})
            res.render(caminhoBase + 'lst', {Alunos: resultado})
        }

        this.find = async(req, res) => {
            const filtro = req.body.filtro;

            let resultado;

            if (!isNaN(filtro) && filtro !== '') {
                // Pesquisa pela capacidade
                resultado = await Aluno.find({
                    capacidade: Number(filtro)
                });
            } else {
                // Pesquisa pelo status
                resultado = await Aluno.find({
                    status: {
                        $regex: filtro,
                        $options: "i"
                    }
                });
            }

            res.render(caminhoBase + 'lst', {Alunos: resultado})
        }

        this.openEdt = async(req, res) => {
            // passar quem eu quero editar
            const id = req.params.id
            console.log(id)

            const aluno = await Aluno.findById(id)
            console.log(aluno)

            res.render(caminhoBase + "edt", {
                Aluno: aluno
            })
        }

        this.edt = async(req, res) => {
            await Aluno.findByIdAndUpdate(
                req.params.id,
                {
                    capacidade: Number(req.body.capacidade),
                    status: req.body.status
                }
            )

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async(req, res) => {
            await Aluno.findByIdAndDelete(req.params.id)

            res.redirect('/' + caminhoBase + 'lst');
        }
    }
}