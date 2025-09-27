import express from 'express';
import { searchSneakers } from '../Controllers/Filter.js';

const router = express.Router();

router.get('/search-sneakers', searchSneakers);

export default router;
