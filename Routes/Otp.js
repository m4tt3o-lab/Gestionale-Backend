import express from 'express';
import { sendOtp } from '../Controllers/Otp.js';
import { verifyOtp } from '../Controllers/VerifyOTP.js';
import { resetPassword } from '../Controllers/ResetPW.js';
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

export default router;
    