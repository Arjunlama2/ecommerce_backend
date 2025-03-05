const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cartSchema = new Schema({
  product_id:{
    type:ObjectId,
    ref:"Product"
  },
  createdBy: {
    type: ObjectId,
    required: true,
    ref:"User"
  },
 
});


const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
