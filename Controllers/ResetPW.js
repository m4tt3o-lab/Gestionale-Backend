import User from '../Models/Auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica token
    const email = decoded.email;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });

    const hashed = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashed });

    res.json({ message: 'Password aggiornata con successo' });
  } catch (err) {
    res.status(401).json({ message: 'Token non valido o scaduto' });
  }
};
