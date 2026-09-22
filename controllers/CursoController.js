import Curso from '../models/curso.js'

export default class CursoController{

    constructor(caminhoBase='curso/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.add = async(req, res)=>{

            await Curso.create({

                nome: req.body.nome,

                telefone: req.body.telefone,

                email: req.body.email,

                imagem: req.file ? req.file.buffer : null

            });

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.list = async(req, res)=>{
            const resultado = await Curso.find({})

            res.render(caminhoBase + 'lst', {
                Cursos: resultado
            })
        }

        this.find = async(req, res)=>{

            const filtro = req.body.filtro;

            let resultado;

            if (!isNaN(filtro) && filtro !== '') {

                resultado = await Curso.find({
                    telefone: Number(filtro)
                });

            } else {

                resultado = await Curso.find({
                    nome: {
                        $regex: filtro,
                        $options: "i"
                    }
                });

            }

            res.render(caminhoBase + 'lst', {
                Cursos: resultado
            })
        }

        this.openEdt = async(req, res)=>{

            const id = req.params.id

            const cliente = await Curso.findById(id)

            res.render(caminhoBase + "edt", {
                Cliente: cliente
            })
        }

        this.edt = async(req, res)=>{

            const dados = {

                nome: req.body.nome,

                telefone: req.body.telefone,

                email: req.body.email

            }

            
            if (req.file) {

                dados.imagem = req.file.buffer

            }

            await Curso.findByIdAndUpdate(
                req.params.id,
                dados
            )

            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{

            await Curso.findByIdAndDelete(req.params.id)

            res.redirect('/' + caminhoBase + 'lst');

        }
    }
}