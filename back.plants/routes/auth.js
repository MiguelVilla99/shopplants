const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORTANTE: Aquí estaba el error. Debes importar la conexión de SQLite, no la lista de plantas.
// Normalmente la conexión está en el archivo principal (server.js) o en un archivo de configuración.
// Si tu conexión db está en server.js y la exportaste, usa esa ruta:
// Busca esta línea y cámbiala:
const db = require('../db.js'); // Ahora apunta al archivo de conexión pura

const JWT_SECRET = process.env.JWT_SECRET || 'shopplants_secret';

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    
    if (!nombre || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificación de seguridad para evitar que el servidor explote si db no carga
    if (!db || typeof db.run !== 'function') {
        console.error("ERROR: La conexión a la base de datos no está disponible en auth.js");
        return res.status(500).json({ error: 'Error de conexión con la base de datos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run("INSERT INTO users (nombre, email, password) VALUES (?, ?, ?)", [nombre, email, hashedPassword], function (err) {
            if (err) {
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ error: 'El email ya está registrado' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar el registro' });
    }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign({ id: user.id, nombre: user.nombre }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, nombre: user.nombre } });
    });
});

module.exports = router;