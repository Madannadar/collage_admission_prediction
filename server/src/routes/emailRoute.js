import express from  'express'; 
import sendOtpEmail from '../controllers/emailController.js';

const router = express.Router();

// Route to send OTP email
router.post('/send-otp', sendOtpEmail);

export default router;