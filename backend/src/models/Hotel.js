const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type:String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },

    amenities: [String]
});

module.exports = mongoose.model("Hotel", hotelSchema);