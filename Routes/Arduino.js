import express from 'express'
import { getCount } from '../Controllers/Arduino.js';

const router = express.Router();

router.get('/total', getCount)

export default router;