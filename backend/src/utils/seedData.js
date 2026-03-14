require("dotenv").config();

const connectDB = require("../config/db");
const Destination = require("../models/Destination");
const Hotel = require("../models/Hotel");

const seedData = async () => {
    try {
        await connectDB();

        await Destination.deleteMany();
        await Hotel.deleteMany();

        await Destination.insertMany([
  {
    name: "Goa",
    country: "India",
    description: "Popular beach destination with nightlife",
    bestSeason: "November to February",
    tags: ["beach", "nightlife", "water sports"],
    attractions: ["Baga Beach", "Fort Aguada"]
  },
  {
    name: "Manali",
    country: "India",
    description: "Mountain destination known for snow and adventure",
    bestSeason: "October to February",
    tags: ["snow", "adventure", "mountains"],
    attractions: ["Solang Valley", "Rohtang Pass"]
  },
  {
    name: "Jaipur",
    country: "India",
    description: "Historic city with forts and palaces",
    bestSeason: "October to March",
    tags: ["heritage", "culture", "forts"],
    attractions: ["Amber Fort", "Hawa Mahal"]
  },
  {
    name: "Kerala",
    country: "India",
    description: "Backwaters and greenery destination",
    bestSeason: "September to March",
    tags: ["nature", "backwaters", "relaxation"],
    attractions: ["Alleppey", "Munnar"]
  },
  {
    name: "Dubai",
    country: "UAE",
    description: "Luxury destination with modern attractions",
    bestSeason: "November to March",
    tags: ["luxury", "shopping", "desert"],
    attractions: ["Burj Khalifa", "Palm Jumeirah"]
  }
]);
       await Hotel.insertMany([
  {
    name: "Taj Exotica Goa",
    destination: "Goa",
    price: 12000,
    rating: 4.8,
    amenities: ["wifi", "pool", "beach access"]
  },
  {
    name: "Goa Beach Resort",
    destination: "Goa",
    price: 9000,
    rating: 4.4,
    amenities: ["wifi", "breakfast"]
  },
  {
    name: "Snow Valley Resort",
    destination: "Manali",
    price: 8500,
    rating: 4.5,
    amenities: ["heater", "wifi"]
  },
  {
    name: "Mountain View Stay",
    destination: "Manali",
    price: 7000,
    rating: 4.2,
    amenities: ["heater", "parking"]
  },
  {
    name: "Royal Heritage Jaipur",
    destination: "Jaipur",
    price: 9500,
    rating: 4.6,
    amenities: ["wifi", "breakfast"]
  },
  {
    name: "Pink City Palace Hotel",
    destination: "Jaipur",
    price: 8200,
    rating: 4.3,
    amenities: ["wifi", "restaurant"]
  },
  {
    name: "Kerala Lake Retreat",
    destination: "Kerala",
    price: 11000,
    rating: 4.7,
    amenities: ["lake view", "wifi"]
  },
  {
    name: "Green Palm Resort",
    destination: "Kerala",
    price: 7800,
    rating: 4.4,
    amenities: ["spa", "wifi"]
  },
  {
    name: "Dubai Grand Palace",
    destination: "Dubai",
    price: 15000,
    rating: 4.9,
    amenities: ["luxury spa", "wifi"]
  },
  {
    name: "Desert Crown Hotel",
    destination: "Dubai",
    price: 13000,
    rating: 4.6,
    amenities: ["pool", "city view"]
  }
]);

 console.log("Seed data inserted");
    process.exit();

  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedData();