import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
  street: { type: String, required: [true, 'Street address is required'], trim: true },
  city: { type: String, required: [true, 'City is required'], trim: true },
  state: { type: String, required: [true, 'State/Province is required'], trim: true },
  postalCode: { type: String, required: [true, 'Postal/ZIP code is required'], trim: true },
  country: { type: String, required: [true, 'Country is required'], trim: true },
}, { _id: false });

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product reference is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1'],
    default: 1,
  },
  price: {
    type: Number,
    required: [true, 'Purchase price is required'],
    min: [0, 'Price cannot be negative'],
  },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
    orderedItems: {
      type: [orderItemSchema],
      required: true,
      validate: [
        (val) => val.length > 0,
        'Order must contain at least one item',
      ],
    },
    totalAmount: {
      type: Number,
      required: [true, 'Total amount is required'],
      min: [0, 'Total amount cannot be negative'],
    },
    shippingAddress: {
      type: shippingAddressSchema,
      required: [true, 'Shipping address is required'],
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'paid', 'failed', 'refunded'],
        message: '{VALUE} is not a valid payment status',
      },
      default: 'pending',
    },
    orderStatus: {
      type: String,
      enum: {
        values: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
        message: '{VALUE} is not a valid order status',
      },
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save validation to compute or verify totalAmount matches orderedItems sum
orderSchema.pre('validate', function() {
  if (this.orderedItems && this.orderedItems.length > 0) {
    const calculatedTotal = this.orderedItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    // Set totalAmount automatically if not already specified, or round it to avoid floating point issues
    if (this.totalAmount === undefined || this.totalAmount === null) {
      this.totalAmount = Math.round(calculatedTotal * 100) / 100;
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
