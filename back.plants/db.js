const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conexión centralizada a la base de datos
const db = new sqlite3.Database(path.join(__dirname, 'plants.db'), (err) => {
    if (err) {
        console.error("❌ Error al conectar con la base de datos:", err.message);
    } else {
        console.log("📦 Base de datos plants.db conectada correctamente.");
    }
});

// Inicialización de la tabla de usuarios
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`, (err) => {
        if (err) console.error("❌ Error al crear la tabla de usuarios:", err.message);
    });
});

module.exports = db;