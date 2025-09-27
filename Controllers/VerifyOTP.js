import User from "../Models/Auth.js";
import jwt from 'jsonwebtoken';

// ✅ Verifica OTP e reimposta la password

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user || user.otp_code !== otp) {
    return res.status(400).json({ message: 'OTP non valido' });
  }
  try {

    if (new Date() > user.otp_expires) {
      return res.status(400).json({ message: 'OTP scaduto' });
    }

    // ✅ Genera token JWT valido 15 minuti
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });

    res.json({ token }); // lo invii al frontend
  } catch (err) {
    res.status(500).json({ message: 'Errore del server' });
  }
};
  