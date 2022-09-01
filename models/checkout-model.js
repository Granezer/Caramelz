const mongoose = require('mongoose')
const date = require('../time')

const checkoutSchema = new mongoose.Schema({
    billing_details: {
        type: Map,
        of: String,
        required: [true, "Billing details are important so pls fill out the form"],
    },
    shipping_details: {
        type: Map,
        of: String,
    },
    orderId: {
        type: Number,
        required: true,
        trim: true
    },
    Order_Note: {
        type: String,
        trim: true
    },
    product_details: {
        type: Map,
        of: String,
    },
    ordered_product: {
        type:[]
    },
    createdAt: {
        type: String,
        default: date
    }
})

module.exports = mongoose.model("Checkout", checkoutSchema)