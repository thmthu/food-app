const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const sql = require('mysql2');
const webRoutes = require('./routes/web');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// View engine setup (assumed to be defined in a separate file)
const configViewEngine = require('./config/viewEngine');
configViewEngine(app);

// Routes
app.use('/', webRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
