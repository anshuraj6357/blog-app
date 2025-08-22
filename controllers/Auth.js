const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;


        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password",
            });
        }


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return res.status(200).json({
            success: true,
            message: "User successfully created",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(501).json({
            success: false,
            message: "User could not be created, please try again later",

        });
    }
}





exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill the details carefully ",
            });
        }

        const user = await User.findOne({ email });
        console.log('Found user:', user);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not registered ",
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        };
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(payload,
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "2hr"
                });

            user.token = token;
            user.password = undefined;
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("babbarCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'User logged in successfully',
            });
        }
        else {

            return res.status(403).json({
                success: false,
                message: " password incorrect",
            });
        }
    }
    catch (error) {
        console.error('Error in login:', error);
        return res.status(501).json({

            success: false,
            message: " please try again later",
        });
    }
}