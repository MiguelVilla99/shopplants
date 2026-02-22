require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importaciones de archivos locales
const products = require('./database.js'); 
const db = require('./db.js'); // Conexión centralizada de SQLite

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- RUTAS ---

// Ruta para obtener productos (plantas)
app.get('/api/products', (req, res) => {
    console.log("Enviando lista de plantas al frontend...");
    res.json(products);
});

// Rutas de autenticación (Registro/Login)
// Asegúrate de que el archivo esté en: ./routes/auth.js
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
    res.send('Shopplants API is running');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en http://localhost:${PORT}`);
    console.log(`🌱 API de plantas en: http://localhost:${PORT}/api/products`);
});