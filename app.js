require('dotenv').config();
require("./models/Product");
require("./models/User");
const express = require('express');
const { sequelize, connectDB } = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const cors = require("cors");

app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

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
    res.send('Welcome to the Chri-j Luxury API');
});

app.use('/api/auth/', authRoutes);
app.use('/api/products/', productRoutes);
app.use('/api/admin', adminRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});