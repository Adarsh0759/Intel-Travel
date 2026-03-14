const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  res.json({ message: "API working successfully" });
});

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