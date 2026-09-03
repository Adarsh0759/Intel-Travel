const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Hotel=require("../models/Hotel");


const createBooking=async(req,res)=>{
     try{
        const{hotelId,checkIn,checkOut,guests}=req.body;

        if(!hotelId || !checkIn || !checkOut || !guests){
            return res.status(400).json({
                message:"All booking fields are required"
            });
        }
        const userId=req.user._id;

        if(!mongoose.Types.ObjectId.isValid(hotelId)){
            return res.status(400).json({
                message: "Invalid hotel ID"
            });
        }

        if(typeof guests!=="number"|| !Number.isInteger(guests)||guests<=0){
            return res.status(400).json({
                message: "Guests must be a positive  whole number"
            });
        }

        const checkInDate=new Date(checkIn);
        const checkOutDate=new Date(checkOut);
        if(
            isNaN(checkInDate.getTime())||
            isNaN(checkOutDate.getTime())
        ){
            return res.status(400).json({
                message: "Invalid date format"
            });
        }
         
        const today=new Date();
        today.setHours(0,0,0,0);

        
        if(checkOutDate<=checkInDate){
            return res.status(400).json({
                message: "Invalid dates"
            });
        } 
        if(checkInDate<today){
            return res.status(400).json({
                message: "Check-in date cannot be in the past"
            });
        }

        const conflictingBooking = await Booking.findOne({
            hotel: hotelId,
            status: "Booked",

            checkIn: {
            $lt: checkOutDate
            },

            checkOut: {
            $gt: checkInDate
            }
        });

        if(conflictingBooking){
            return res.status(400).json({
                message: "Hotel is not available for the selected dates"
            });
        }

     


        const booking= await Booking.create({
            user: userId,
            hotel: hotelId,
            checkIn,
            checkOut,
            guests
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    }
    catch(error){
        console.error(error);

        res.status(500).json({
            message: "Failed to create booking"
        });
    }
};

const getMyBookings = async(req,res)=>{
    try{
        const userId=req.user._id;

        const bookings=await Booking.find({
            user: userId
        }).populate("hotel");

        res.status(200).json({
            message: "Your Bookings",
            bookings
        });
        
    }catch (error){
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch bookings"
        });
    }

};

const cancelBookings = async(req,res) => {
    try{
        const {bookingId} = req.params;
        const userId = req.user._id;

        if(!mongoose.Types.ObjectId.isValid(bookingId)){
            return res.status(400).json({
                message: "Invalid booking ID"
            });
        }

        const booking = await Booking.findById(bookingId);

        if(!booking){
            return res.status(404).json({
                message: "Booking not found"
            });
        }

        if(!booking.user.equals(userId)){
            return res.status(403).json({
                message: "Not authorized to cancel this booking"
            });
        }

        if(booking.status==="Cancelled"){
            return res.status(400).json({
                message: "Booking is already cancelled"
            });
        }

        booking.status= "Cancelled";
        booking.cancelledAt= new Date();

        await booking.save();


        res.status(200).json({
            message: "Booking cancelled successfully",
            booking
        });

    } catch(error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to cancel booking"
        });
    }
};




module.exports={
    createBooking,
    getMyBookings,
    cancelBookings
};