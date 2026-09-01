import conexao from '../config/conexao.js'

const Curso = conexao.Schema({

    nome: {
        type: String,
        required: true
    },

    telefone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: false
    }

})

export default conexao.model('Curso', Curso)