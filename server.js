const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Load products data
const products = require('./products.json');

// Route to get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Route to get a product by its name
app.get('/api/products/:name', (req, res) => {
    const product = products.find(p => p.name.toLowerCase() === req.params.name.toLowerCase());
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Route to add a new product (optional)
app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    fs.writeFileSync(path.join(__dirname, 'products.json'), JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
