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
    },

    imagem: {
        type: Buffer,
        required: false
    }

})

Curso.methods.imagemBase64 = function() {

    if (this.imagem) {
        return `data:image/png;base64,${this.imagem.toString('base64')}`
    }

    return null
}

export default conexao.model('Curso', Curso)