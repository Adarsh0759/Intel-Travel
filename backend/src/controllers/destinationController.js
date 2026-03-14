const Destination = require("../models/Destination");

const getDestinations = async (req, res) => {
    try {
        const query = {};

        if(req.query.country) {
            query.country = req.query.country;
        }

         if(req.query.destination) {
            query.destination = new RegExp(req.query.destination, "i");
        }

        if(req.query.tag){
            query.tags = req.query.tag;
        }

        const destinations = await Destination.find(query).select("-__v");
        res.json(destinations);

    } catch (error) {
      res.status(500).json({ message: "Failed to fetch destinations"});
    }
};

module.exports = { getDestinations };
