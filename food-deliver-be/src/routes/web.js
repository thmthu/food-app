const express = require('express');
const router = express.Router();
const { getRestaurantById, getCreateRestaurant, createRestaurant, getFeatured, getFeaturedRestaurants, getRestaurantDetails } = require('../controllers/homeController');

router.get('/featured', getFeatured);
router.get('/restaurantDetails/:id', getRestaurantDetails);
router.post('/create', createRestaurant);
router.get('/create-page', getCreateRestaurant);
router.get('/featuredRestaurants/:id', getFeaturedRestaurants)
router.get('/restaurant/:id', getRestaurantById);



module.exports = router;
