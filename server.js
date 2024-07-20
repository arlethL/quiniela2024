const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const quinielaRoutes = require('./routes/quiniela');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB Atlas
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://torneofc2024:jahirRobles2003@cluster0.krher7p.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB conectado a Atlas...'))
    .catch(err => console.error('Error de conexión a MongoDB Atlas:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de API
app.use('/api/quiniela', quinielaRoutes);

// Manejo de rutas desconocidas o errores
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});