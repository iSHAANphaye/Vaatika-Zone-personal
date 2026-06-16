import Product from '../models/Product.js';

/**
 * Get all products with optional filtering, sorting, and text searching
 * GET /api/products
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const queryObj = {};

    // 1. Filtering by Category
    if (req.query.category) {
      queryObj.category = req.query.category;
    }

    // 2. Text Search indexing
    if (req.query.search) {
      queryObj.$text = { $search: req.query.search };
    }

    // Initialize the mongoose query
    let query = Product.find(queryObj);

    // 3. Sorting (e.g., sort=price or sort=-price)
    if (req.query.sort) {
      // mongoose expects fields separated by spaces: 'price' or '-price'
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      // Default sorting: newest products first
      query = query.sort('-createdAt');
    }

    // 4. Pagination Setup
    const page = req.query.page ? parseInt(req.query.page, 10) : null;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : null;

    // Get total count matching current filters (search, category)
    const total = await Product.countDocuments(queryObj);

    if (page && limit) {
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    // Execute query
    const products = await query;

    res.status(200).json({
      success: true,
      count: products.length,
      pagination: {
        totalItems: total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
        currentPage: page || 1,
        limit: limit || total
      },
      data: {
        products,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single product by ID
 * GET /api/products/:id
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: {
        product,
      },
    });
  } catch (error) {
    // If ID is cast-error (invalid objectId) return 404
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`,
      });
    }
    next(error);
  }
};
