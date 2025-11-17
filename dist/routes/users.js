"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const router = (0, express_1.Router)();
// Agregar un registro (POST /users)
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const [result] = await database_1.default.execute('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al agregar usuario' });
    }
});
// Actualizar un registro (PUT /users/:id)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        await database_1.default.execute('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        res.json({ id, name, email });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar usuario' });
    }
});
// Eliminar un registro (DELETE /users/:id)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await database_1.default.execute('DELETE FROM users WHERE id = ?', [id]);
        res.json({ message: 'Usuario eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar usuario' });
    }
});
// Opcional: Obtener todos los registros (GET /users)
router.get('/', async (req, res) => {
    try {
        const [rows] = await database_1.default.execute('SELECT * FROM users');
        res.json(rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});
exports.default = router;
