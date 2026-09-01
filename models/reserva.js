import conexao from '../config/conexao.js'

const Reserva = conexao.Schema({

    cliente: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Curso',
        required: true
    },

    mesa: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Aluno',
        required: true
    },

    dataHora: {
        type: Date,
        required: true
    }

})

export default conexao.model('Reserva', Reserva)