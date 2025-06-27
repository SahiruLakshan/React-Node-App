import express from 'express';
const router = express.Router();
import {createProduct, getAllProducts, getProductById, updateProduct, deleteProduct} from '../controllers/productController.js';

//Product add
router.post('/create', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get product by id
router.get('/:id', getProductById);

// Update product by id
router.put('/update/:id', updateProduct);

// Delete product by id
router.delete('/delete/:id', deleteProduct);

export default router;
