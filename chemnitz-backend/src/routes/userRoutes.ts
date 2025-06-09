// routes/authRoutes.js

import express from 'express';
import { register, getUser} from "../controllers/userController"
import { authenticateJWT } from '../middlewares/authenticateUser';

const router = express.Router();

router.post('/register', register);
router.get('/getUser', authenticateJWT, getUser);


export default router;
