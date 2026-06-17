import Order from '../models/Order.js';
import Product from '../models/Product.js';

/**
 * Create a new Order (Checkout)
 * POST /api/orders
 * Protected
 */
export const createOrder = async (req, res, next) => {
  try {
    const { orderedItems, shippingAddress } = req.body;

    // 1. Validate request body
    if (!orderedItems || orderedItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No ordered items provided',
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        success: false,
        message: 'Shipping address is required',
      });
    }

    // 2. Validate products existence and stock levels, and snapshot prices
    const validatedItems = [];
    
    for (const item of orderedItems) {
      if (!item.product || !item.quantity) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have a product ID and quantity',
        });
      }

      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} not found`,
        });
      }

      // Check stock availability
      if (product.stockCount < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for product: ${product.name}. Available: ${product.stockCount}, Requested: ${item.quantity}`,
        });
      }

      // Prepare ordered item structure with the current snapshot price
      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price, // Snapshot price at purchase time
      });
    }

    // 3. Deduct stock for all items
    for (const item of orderedItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stockCount: -item.quantity } },
        { new: true, runValidators: true }
      );
    }

    // 4. Create and save the Order
    // Note: totalAmount is automatically calculated in the Order schema's pre-validate hook
    const order = await Order.create({
      user: req.user._id,
      orderedItems: validatedItems,
      shippingAddress,
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get orders of the logged-in customer
 * GET /api/orders
 * Protected
 */
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('orderedItems.product', 'name price images')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    next(error);
  }
};
