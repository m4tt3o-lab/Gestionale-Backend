import nodemailer from 'nodemailer';
import User from '../Models/Auth.js';
import validator from 'validator';
// Funzione per generare un OTP a 6 cifre
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ✅ Invia OTP via email
export const sendOtp = async (req, res) => {
  
  const { email } = req.body;
  
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'Email non valida' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Utente non trovato' });

    const otp = generateOtp();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minuti

    await user.update({
      otp_code: otp,
      otp_expires: expires
    });

    // Invia OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // oppure smtp personalizzato
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD_EMAIL, // usa una app password o dotenv
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Recupero password - Codice OTP',
      text: `Il tuo codice OTP è: ${otp}. Scade in 10 minuti`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'OTP inviato all’email specificata' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Errore interno del server' });
  }
};