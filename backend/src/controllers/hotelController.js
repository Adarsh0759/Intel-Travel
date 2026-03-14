const Hotel = require("../models/Hotel");

const getHotels = async (req, res) => {
    try{

        const query = {};

        if(req.query.destination){
            query.destination = req.query.destination;
        }

        if(req.query.maxPrice){
            query.price = { $lte: Number(req.query.maxPrice) };
        }

        if (req.query.rating) {
        query.rating = { $gte: Number(req.query.rating) };
        }

        const hotels = await Hotel.find(query).select("-__v");
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch hotels"});
    }
};

const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if(!hotel) {
            return res.status(404).json({ message: " Hotel not found" });
        }

        res.json(hotel);
      } catch (error) {
        res.status(400).json({ message: "Invalid hotel id" });
    }
};

module.exports = { getHotels, getHotelById };