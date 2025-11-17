import { Router, Request, Response } from 'express';
import pool from '../database';

const router = Router();

// Agregar un registro (POST /users)
/*
router.post('/', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    res.status(201).json({ id: (result as any).insertId, name, email });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar usuario' });
  }
});
*/
// Actualizar un registro (PUT /users/:id)
/*
router.put('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await pool.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    res.json({ id, name, email });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});
*/
// Eliminar un registro (DELETE /users/:id)
/*
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});
*/
// Opcional: Obtener todos los registros (GET /users)
router.get('/', async (req: Request, res: Response) => {
  try {

    const [rows] = await (await pool).execute('SELECT * FROM users;');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error, mensaje: 'Error al obtener usuarios'});
  }
});

export default router;