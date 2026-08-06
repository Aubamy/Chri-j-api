require('dotenv').config();
require("./models/Product");
require("./models/User");
const express = require('express');
const { sequelize, connectDB } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();


sequelize.sync({ alter: true })
    .then(() => {
        console.log('✅ Database synced');
    })
    .catch((error) => {
        console.error('Sync error:', error);
    });

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/auth/', authRoutes);
app.use('/api/products/', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});