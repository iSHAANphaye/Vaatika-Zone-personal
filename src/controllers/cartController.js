import Cart from '../models/Cart.js';

/**
 * Get the current user's shopping cart
 * GET /api/cart
 */
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    // If no cart exists yet, return an empty array
    if (!cart) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: cart.items,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Replace/Update the current user's shopping cart items
 * POST /api/cart
 */
export const updateCart = async (req, res, next) => {
  try {
    const { items } = req.body; // Expects array of { product: productId, quantity: number }

    if (!Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: 'Items must be an array of products and quantities',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    cart.items = items;
    await cart.save();

    // Populate the product details before returning
    await cart.populate('items.product');

    res.status(200).json({
      success: true,
      data: cart.items,
    });
  } catch (error) {
    next(error);
  }
};
