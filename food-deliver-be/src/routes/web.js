const express = require('express');
const router = express.Router();
const { getRestaurantById, getCreateRestaurant, createRestaurant, getFeatured, getFeaturedRestaurants, getRestaurantDetails } = require('../controllers/restaurantControllers');
const { login, signup, bill } = require('../controllers/userControllers')

router.get('/featured', getFeatured);
router.get('/restaurantDetails/:id', getRestaurantDetails);
router.post('/create', createRestaurant);
router.get('/create-page', getCreateRestaurant);
router.get('/featuredRestaurants/:id', getFeaturedRestaurants)
router.get('/restaurant/:id', getRestaurantById);

router.post('/login', login)
router.post('/signup', signup)
router.post('/bill', bill)





module.exports = router;
