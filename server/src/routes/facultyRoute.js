import express from  'express'; 
import {    
    saveFacalty,
    getFaculties,
    getFacultyLabels
} from '../controllers/facultyController.js';

const router = express.Router();

// Route to send OTP email
router.get('/getFaculty', getFaculties);
router.post('/save', saveFacalty);
router.post('/getLabel', getFacultyLabels);

export default router;