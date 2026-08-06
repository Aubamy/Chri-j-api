const router = require("express").Router();
const auth = require("../Middleware/auth");
const { getProducts, dashboard } = require("../controllers/adminController");

router.get("/products", auth, getProducts);
router.get("/dashboard", auth, dashboard);

module.exports = router;