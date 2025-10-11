import express from 'express';
import { getSneakers, getSneakersByModel, postSneaker, getSneakerById, updateSneaker, deleteSneaker } from '../Controllers/Sneakers.js';
const router = express.Router();
router.get('/', async (req, res) => {
    if (Object.keys(req.query).length > 0) {
      await getSneakersByModel(req, res);
    } else {
      await getSneakers(req, res);
    }
});
router.get('/:id', getSneakerById)
router.post('/', postSneaker);
router.patch('/:id', updateSneaker);
router.delete('/:id', deleteSneaker)

export default router;