import conexao from '../config/conexao.js'

const Aluno = conexao.Schema({
    nome: {
        type: String,
        required: false
    },

    capacidade: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    }
})

export default conexao.model('Aluno', Aluno)