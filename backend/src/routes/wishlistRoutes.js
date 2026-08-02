 const express=require("express");
 const router=express.Router();

 const {
    addToWishlist,
    getWishlist,
    removeFromWishlist
 }=require("../controllers/wishlistController");
 //imports controller fxn
 const protect=require("../middleware/authMiddleware");
 //imports auth middleware
 router.post("/",protect,addToWishlist);
 router.get("/",protect,getWishlist);
 router.delete("/:hotelId",protect,removeFromWishlist);


 module.exports=router;
 //exports router so it can be mounted in server.js