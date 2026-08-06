const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const products = await Product.findAll();

        res.json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



exports.dashboard = async (req, res) => {

    try {

        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access Denied"
            });
        }

        const totalProducts = await Product.count();

        const products = await Product.findAll();

        res.json({
            totalProducts
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};