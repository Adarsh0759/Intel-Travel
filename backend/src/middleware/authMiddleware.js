const jwt = require("jsonwebtoken");
const User = require("../models/User");


//without async : await invalid inside normal function
const protect = async (req, res, next) => {
  try {
const authHeader = req.headers.authorization;

if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({ message: "No token provided" });
}

const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //jwt.verify: Token must be checked against: JWT_SECRET

 req.user = await User.findById(decoded.id).select("-password -__v");
    /*
    .select("-password")
Critical security step.
Removes password field.
Because even hashed password should never return.
    */

    next();
    //Without: request stops here forever.

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = protect;