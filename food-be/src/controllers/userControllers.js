const connection = require('../config/database');

const login = async (req, res) => {
    try {
        console.log(req.body)
        const { email, password } = req.body;
        console.log(email, password)
        let [results] = await connection.query('SELECT * FROM Users where email = ? and password = ?', [email, password]);
        if (results.length === 0) {
            return res.status(404).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
const signup = async (req, res) => {
    try {
        const { email, password, user, address } = req.body;

        let [existingUsers] = await connection.query(
            'SELECT * FROM Users WHERE LOWER(email) = LOWER(?) OR LOWER(username) = LOWER(?)',
            [email, user]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }

        let [results] = await connection.query(
            'INSERT INTO Users (email, password, username, address) VALUES (?,?,?,?)',
            [email, password, user, address]
        );

        return res.status(201).json({ message: 'User created' });
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
const bill = async (req, res) => {
    try {
        const { billDetails, email, total } = req.body;

        // Insert into Bills table
        const [bill] = await connection.query(
            'INSERT INTO Bills (email, total) VALUES (?,?)',
            [email, total]
        );

        // Get the id of the inserted bill
        const billId = bill.insertId;

        // Insert into BillDetails table
        for (let detail of billDetails) {
            await connection.query(
                'INSERT INTO BillDetails (bill_id, dish_id, quantity) VALUES (?,?,?)',
                [billId, detail.dish_id, detail.quantity]
            );
        }

        return res.status(201).json({ message: 'Bill created' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}

module.exports = { login, signup, bill };
