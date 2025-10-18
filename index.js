import express from "express";
import cors from 'cors';
import sneakersRoutes from './Routes/Sneakers.js'
import linksRoutes from './Routes/Links.js'
import filterSneakersRoute from './Routes/Filter.js'
import arduinoRoutes from './Routes/Arduino.js'
import authRoutes from './Routes/Auth.js'
import discountsRoutes from './Routes/Discounts.js'
import otpRoutes from './Routes/Otp.js'
import { authenticateToken } from "./middlewares/middleware.js";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); 


app.use('/auth', authRoutes )


app.use('/sneakers',authenticateToken, sneakersRoutes);
app.use('/links',authenticateToken,  linksRoutes);
app.use('/discounts',authenticateToken,  discountsRoutes)
app.use('/arduino',  arduinoRoutes)
app.use('/filter',authenticateToken,  filterSneakersRoute);
app.use('/otp',authenticateToken,  otpRoutes)


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`🚀 Server in esecuzione sulla porta ${PORT}`);
});
