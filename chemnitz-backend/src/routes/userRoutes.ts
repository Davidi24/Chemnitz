import express from 'express';
import { register, getUser } from "../controllers/userController";
import { authenticateJWT } from '../middlewares/authenticateUser';
import { addFavourite, removeFavourite, getFavourites, addReviewToFeature, deleteReviewFromFeature, getFeatureReviews } from '../controllers/userFeatureController';

import { updateProfile } from "../controllers/userController";


const router = express.Router();

router.post('/register', register);
router.get('/getUser', authenticateJWT, getUser);
router.post('/favourites/add/:featureId', authenticateJWT, addFavourite);
router.post('/favourites/remove/:featureId', authenticateJWT, removeFavourite);
router.get('/favourites', authenticateJWT, getFavourites);
router.post('/features/:featureId/review', authenticateJWT, addReviewToFeature);
router.delete('/features/:featureId/review', authenticateJWT, deleteReviewFromFeature);
router.get('/features/:featureId/reviews', getFeatureReviews);


router.patch('/profile', authenticateJWT, updateProfile);


export default router;
