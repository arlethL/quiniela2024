const express = require('express');
const router = express.Router();
const Quiniela = require('../models/Quiniela');

// Obtener todas las quinielas
router.get('/', async (req, res) => {
    try {
        const quinielas = await Quiniela.find();
        res.json(quinielas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});





// Crear una nueva quiniela
router.post('/', async (req, res) => {
    const { nombre, jornada, partidos } = req.body;

    const quiniela = new Quiniela({
        nombre,
        jornada,
        partidos
    });

    try {
        const nuevaQuiniela = await quiniela.save();
        res.status(201).json(nuevaQuiniela);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener quinielas por jornada
// Obtener quinielas por jornada
router.get('/jornada/:numero', async (req, res) => {
    try {
        const quinielas = await Quiniela.find({ jornada: req.params.numero });
        res.json(quinielas);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Calcular puntos por jornada (dinámico)
// Calcular puntos por jornada (dinámico)
router.post('/calcular-puntos', async (req, res) => {
    const resultadosOficiales = req.body.resultados; // { partido1: "Local", partido2: "Empate", ... }
    const jornada = req.body.jornada;

    try {
        const quinielas = await Quiniela.find({ jornada });
        const puntuaciones = [];

        for (let quiniela of quinielas) {
            let puntos = 0;
            quiniela.partidos.forEach((partido, index) => {
                const key = `partido${index + 1}`;
                if (partido.resultado === resultadosOficiales[key]) {
                    puntos++;
                }
            });

            // Actualizar puntos en la base de datos
            quiniela.puntos = puntos;
            await quiniela.save();

            puntuaciones.push({ nombre: quiniela.nombre, puntos });
        }

        res.json(puntuaciones);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.delete('/usuario/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await Quiniela.deleteOne({ _id: userId });
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
