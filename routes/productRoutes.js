const router = require('express').Router();

const auth = require('../Middleware/auth');
const upload = require('../Middleware/uploadMiddleware');

const {
    addProduct,
    getAllProducts,
    editProduct,
    deleteProduct,
    getProductById
} = require('../controllers/productController');

router.post('/add', auth, upload.single('image'), addProduct);

router.put('/edit/:id', auth, upload.single('image'), editProduct);

router.delete('/delete/:id', auth, deleteProduct);

// router.get('/get/:id', auth, getProductById);

router.get('/getAll', getAllProducts);
module.exports = router;