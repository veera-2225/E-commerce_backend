const express = require("express");
const { addProduct } = require("./productController");
const Product = require("./productModel");
const path = require('path');
const fs = require('fs');

const route = express.Router();

route.post("/addProduct", addProduct);

route.get("/getProducts", async (req, res) => {
  try {
    const response = await Product.find();

    res.json({ response });

    console.log("Products fetched");
  } catch (error) {
    console.log("Error while fetching");
  }
});

/* route.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path2D.join(__dirname, '..', 'uploads', imageName));
}); */

route.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, '.', 'uploads', imageName);

  // Check if file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).send('Image not found');
  }

  // Set proper content type automatically
  res.type('image/jpeg');
  res.sendFile(imagePath);
});

module.exports = route;
