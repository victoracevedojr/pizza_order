const mongoose = require("mongoose");

const PizzaSchema = new mongoose.Schema({
    pizzaType: {
        type:String,
        require: [true, "Pizza type is required!"],
        minlength: [1, "Pizza type is required!"]
    },
    size: {
        type:String,
        require: [true, "Size is required!"],
        minlength: [1, "Size is required!"]
    },
    notes: {
        type:String,
        maxlength: [25, "Notes must contain max of 25 characters!"]
    },
    deliveryStatus: {
        type:Boolean,
        default:false
    },
    deliveryTime: {
        type:Date,
        require: [true, "Delivery time is required!"],
    }
}, {timestamps:true})

module.exports = mongoose.model("Pizza", PizzaSchema);