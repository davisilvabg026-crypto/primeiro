import conexao from '../config/conexao.js'

const Aluno = conexao.Schema({

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