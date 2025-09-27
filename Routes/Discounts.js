import { postDiscount, getDiscounts,getDiscountsBySito, deleteDiscount, updateDiscount } from "../Controllers/Discounts.js";
import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    if (Object.keys(req.query).length > 0) {
      await getDiscountsBySito(req, res);
    } else {
      await getDiscounts(req, res);
    }
});
router.post('/',postDiscount)
router.patch('/:id',updateDiscount)
router.delete('/:id',deleteDiscount)



export default router;