const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  customerId: {
    type: String,
    required: [true, 'customerId required']
  },
  customerName: {
    type: String,
    minlength: 3,
    required: [true, 'customerName required'],
  }
});

module.exports = mongoose.model('customer', customerSchema);