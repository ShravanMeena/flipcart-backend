const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
  // user is exist or not
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (cart) {
      // check is items already exist or not
      const product = req.body.cartItems.product;
      const isItemExist = cart.cartItems.find((c) => c.product == product);
      if (isItemExist) {
        // if cart already exists then update cart
        Cart.findOneAndUpdate(
          { user: req.user._id, "cartItems.product": product },
          {
            $set: {
              cartItems: {
                ...req.body.cartItems,
                quantity: req.body.cartItems.quantity,
              },
            },
          }
        ).exec((error, _cart) => {
          if (error) {
            return res.status(400).json({ error });
          }
          if (_cart) {
            return res.status(200).json({ cart: _cart });
          }
        });
      } else {
        // if cart already exists then update cart
        Cart.findOneAndUpdate(
          { user: req.user._id },
          {
            $push: {
              cartItems: req.body.cartItems,
            },
          }
        ).exec((error, _cart) => {
          if (error) {
            return res.status(400).json({ error });
          }
          if (_cart) {
            return res.status(200).json({ cart: _cart });
          }
        });
      }
    } else {
      // if cart not exists then create a new cart
      const cart = new Cart({
        user: req.user._id,
        cartItems: [req.body.cartItems],
      });

      cart.save((error, cart) => {
        if (error) {
          return res.status(400).json({ error });
        }
        if (cart) {
          return res.status(200).json({ cart });
        }
      });
    }
  });
};