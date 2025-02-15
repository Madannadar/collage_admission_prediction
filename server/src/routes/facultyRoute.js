import express from  'express'; 
import {    
    saveFacalty,
    getFaculties,
} from '../controllers/facultyController.js';

const router = express.Router();

router.get('/getFaculty', getFaculties);
router.post('/save', saveFacalty);

export default router;