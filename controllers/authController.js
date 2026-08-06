const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

console.log("JWT_SECRET:", process.env.JWT_SECRET);

exports.register = async (req, res) => {
    try {
        const shema = Joi.object({
            fullName: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(10).required(),
            password: Joi.string().min(6).required(),
            confirmPassword: Joi.ref('password')
        });

        const { error } = shema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const { fullName, email, phone, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            phone,
            password: hashedPassword,
            role: 'user'
        });

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user.id,
                fullname: user.fullName,
                email: user.email,
                phone: user.phone,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }

};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.logout = async (req, res) => {
    res.status(200).json({ success: true, message: 'Logout successful' });
}
