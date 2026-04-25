
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const hotelRoutes = require("./routes/hotelRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

app.use(cors());
app.use(express.json());

/*
Why This Route Exists
Pure testing.
Later wishlist/booking use same middleware.
*/
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});


app.get("/api/health", (req, res) => {
  res.json({ message: "API working successfully" });
});

app.use("/api/hotels", hotelRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();  //connect databse first

        app.listen(PORT, () => {
            console.log(`Server Running on port ${PORT}`);
        });
    } catch(error){
        console.error("Failed to start server :", error);
    }
};

startServer();