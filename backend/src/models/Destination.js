const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    bestSeason: {
        type: String
    },
    tags: [String],
    attractions: [String]
});

module.exports = mongoose.model("Destination",destinationSchema);