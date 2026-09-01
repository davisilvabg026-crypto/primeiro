import conexao from '../config/conexao.js'

const Prato = conexao.Schema({

    nome: {
        type: String,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },

    disponivel: {
        type: Boolean,
        required: true
    }

})

export default conexao.model('Prato', Prato)