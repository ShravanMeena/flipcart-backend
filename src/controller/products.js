const Product = require("../models/product");
const slugify = require("slugify");

exports.createProduct = (req, res) => {
  //   return res.status(200).json({
  //     images: req.files,
  //     body: req.body,
  //    });

  const { name, nsp, mrp, description, category, quantity } = req.body;

  let productPictures = [];
  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }

  const _product = new Product({
    name,
    slug: slugify(req.body.name),
    nsp,
    mrp,
    quantity,
    description,
    category,
    createdBy: req.user._id,
    productPictures,
  });

  _product.save((error, product) => {
    if (error) {
      return res.status(400).json({ error: error.errors });
    }
    if (product) {
      return res.status(200).json({
        product,
      });
    }
  });
};
