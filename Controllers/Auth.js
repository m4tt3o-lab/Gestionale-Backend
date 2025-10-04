import User from "../Models/Auth.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config();



export const login = async (req, res)=> {
    const {username, password} = req.body
    const user = await User.findOne({ where: { username } });

    if (!user) {return res.status(404).json({status: 'error' , message: 'utente/password errata'}) }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            }, process.env.JWT_SECRET, { expiresIn: "3h" } 
        );
            return res.json({status: 'ok', data:token })
    }
    res.status(401).json({status: 'error' , message: 'utente/password errata'})
}



export const register = async (req, res) => {
    const { email,username, password } = req.body;

    if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Email mancante o non valida" });
    }

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Username non valido' });
    }

    if (!password || typeof password !== 'string') {
        return res.status(400).json({ status: 'error', message: 'Password non valida' });
    }

    if (password.length < 8) {
        return res.status(400).json({ status: 'error', message: 'Password troppo corta (minimo 8 caratteri)' });
    }

    try {
        // Controllo se l'utente esiste già
        const existingEmail = await User.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(400).json({ status: 'error', message: 'Email già in uso' });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ status: 'error', message: 'Username già in uso' });
        }

        // Hash della password
        const passwordHashed = await bcrypt.hash(password, 10);

        // Creazione dell'utente
        const newUser = await User.create({ 
            email:email,
            username:username,
            password: passwordHashed });

        return res.status(201).json({ status: 'success', message: 'Utente registrato con successo', user: newUser });
    } catch (error) {
        console.error('Errore nella registrazione:', error);
        return res.status(500).json({ status: 'error', message: 'Errore del server' });
    }
};
