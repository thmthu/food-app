const connection = require('../config/database');
const getCreateRestaurant = (req, res) => {
    return res.render('create.ejs');

}
const createRestaurant = async (req, res) => {
    try {
        const { restaurantId, foodId, nameFood, image, descriptionFood, price } = req.body;
        let [result] = await connection.query('INSERT INTO Dishes (id, name,description, price,image,restaurant_id) VALUES (?,?,?,?,?,?)', [foodId, nameFood, descriptionFood, price, image, restaurantId]);
        res.status(201).json({ message: 'Restaurant created successfully', restaurantId: results.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

const getFeatured = async (req, res) => {
    try {
        let [results] = await connection.query('SELECT * FROM Featured');
        return res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
const getFeaturedRestaurants = async (req, res) => {
    try {
        let featureId = req.params.id;
        let [results] = await connection.query('SELECT * FROM Restaurants where featured_id = ?', [featureId]);
        console.log(featureId)
        return res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
const getRestaurantById = async (req, res) => {
    try {
        let restaurantId = req.params.id;
        let [results] = await connection.query('SELECT * FROM Restaurants where id = ?', [restaurantId]);
        return res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
const getRestaurantDetails = async (req, res) => {
    try {
        let restaurantId = req.params.id;
        let [results] = await connection.query('SELECT * FROM Dishes where restaurant_id = ?', [restaurantId]);
        return res.json({ results });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};
module.exports = { getRestaurantById, getFeatured, getCreateRestaurant, createRestaurant, getFeaturedRestaurants, getRestaurantDetails };
