import express from 'express';
import { authUser,registerUser, getUserProfile,updateUser , logoutUser } from '../controller/userController.js';
import upload from '../middleware/multer.js'
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/login', authUser)

router.post('/signup',upload.single('image'), registerUser)

router.get('/home', protect, getUserProfile)

router.put('/update',protect,  updateUser)

router.post('/logout', logoutUser)

export default router