const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartidoSchema = new Schema({
    nombre: String,
    resultado: String,
});

const QuinielaSchema = new Schema({
    nombre: { type: String, required: true },
    jornada: { type: Number, required: true },
    partidos: [PartidoSchema],
    puntos: { type: Number, default: 0 }, // Campo para almacenar los puntos calculados

});

module.exports = mongoose.model('Quiniela', QuinielaSchema);
