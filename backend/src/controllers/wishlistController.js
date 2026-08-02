const Wishlist = require("../models/Wishlist");

const addToWishlist = async(req,res)=>{
    try{ 
    const{hotelId}=req.body;
    const userId=req.user._id;

    const existingWishlist = await Wishlist.findOne({
        user:userId,
        hotel: hotelId
    });

    if(existingWishlist){
        return res.status(400).json({
            message:"Hotel already in wishlist"
        })
    }

    const wishlist=await Wishlist.create({
        user:userId,
        hotel:hotelId
    });
    //Create wishlist


    res.status(201).json({
        message:"Hotel added to wishlist",
        wishlist
    })
    }
    catch(error){
        console.error(error);
        
        res.status(500).json({
            message:"Failed to add hotel to wishlist"
        });
    }
};

    const getWishlist=async(req,res)=>{
        try{
            const userId=req.user._id;

            const wishlist=await Wishlist.find({
                user:userId
            }).populate("hotel");

            res.status(200).json({
                message:"Your Wishlist",
                wishlist
            });
        }
        catch(error){
            console.error(error);

            res.status(500).json({
                message:"Failed to fetch wishlist"
            });
        }

    };
    //To read wishlist

    const removeFromWishlist=async(req, res)=>{
        try{
            const{hotelId}=req.params;
            const userId=req.user._id;

            const deletedWishlist=await Wishlist.deleteOne({
                user: userId,
                hotel: hotelId
            });

            if(deletedWishlist.deletedCount===0){

                return res.status(404).json({
                    message: "Wishlist item not found"
                });
            }
            res.status(200).json({
                message: "Hotel removed from wishlist"
            });
        } catch(error){

            console.error(error);

            res.status(500).json({
                message: "Failed to remove hotel"
            });
        }
    };

module.exports={
    addToWishlist,
    getWishlist,
    removeFromWishlist

};

