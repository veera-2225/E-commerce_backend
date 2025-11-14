const Product = require("./productModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/")
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({storage:storage})

const addProduct = async (req, res) => {
  try {
    const {
      product,
      company,
      model,
      price,
      category,
      description,
      rating,
    } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const type = req.body.type ? req.body.type : undefined;

    const newProduct = new Product({
      product,
      image,
      type,
      company,
      model,
      price,
      category,
      description,
      rating,
    });

    await newProduct.save();

    console.log("Product added");

    return res.status(200).json({ message: "Product added successfully" });
  } catch (error) {
    console.log("Failed to add product ", error);
  }
};

module.exports = { addProduct:[upload.single("image"), addProduct] };
