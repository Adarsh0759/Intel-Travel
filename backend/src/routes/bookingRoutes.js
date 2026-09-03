const express=require("express");
const router=express.Router();

const{
    createBooking,
    getMyBookings,
    cancelBookings
}=require("../controllers/bookingController");


const protect=require("../middleware/authMiddleware");

router.post("/",protect,createBooking);
router.get("/", protect, getMyBookings);
router.delete("/:bookingId", protect, cancelBookings);

module.exports=router;