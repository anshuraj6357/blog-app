const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
    
        const token = req.cookies.babbarCookie;

        console.log(token)

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("Decoded token:", decoded);

        req.user = decoded;
  
        next();
    } catch (error) {

        return res.status(403).json({
            success: false,
            message: "Token is invalid",
        });
    }
};
