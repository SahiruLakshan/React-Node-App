import Product from "../models/Product.js";

// Create a new product logic
export const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const existingProduct = await Product.findOne({ name: name.trim() });
        
        if (existingProduct) {
            return res.status(400).json({ error: "Product with this name already exists" });
        }

        if (isNaN(price) || typeof price !== 'number') {
            return res.status(400).json({ error: "Price must be a number" });
        }
        if (isNaN(quantity) || typeof quantity !== 'number') {
            return res.status(400).json({ error: "Quantity must be a number" });
        }

        const product = new Product({ name, price, quantity });
        await product.save();

        res.status(201).json({ message: "Product added successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all products logic
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a product by id logic
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a product by id logic
export const updateProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, quantity },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(201).json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a product by id logic
export const deleteProduct = async (req, res) => {
    try {
        const deleted = await Product.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
