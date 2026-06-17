import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      trim: true,
    },
    stockCount: {
      type: Number,
      required: [true, 'Stock count is required'],
      default: 0,
      min: [0, 'Stock count cannot be negative'],
    },
    images: {
      type: [String],
      default: [],
    },
    // Flexible object to store arbitrary product specifications (e.g. dimensions, color, weight, material)
    attributes: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for category filtering and price sorting
productSchema.index({ category: 1, price: 1 });

// Text index for the search bar (name and description)
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);

export default Product;
