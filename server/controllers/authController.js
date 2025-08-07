import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import getTransporter from "../config/nodemailer.js";
import getWelcomeEmailTemplate from "../utils/emailTemplates.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "Please fill all the fields" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 3600000 // 1 hour
        });

        // Sending Welcome Email 
        const transporter = getTransporter();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "🎉 Welcome to MERN Auth - Your Account is Ready!",
            html: getWelcomeEmailTemplate(name, email)
        };

        await transporter.sendMail(mailOptions);

        return res.status(201).json({ success: true, message: "User registered successfully" });
    }
    catch (error) {
        console.error("Error in registration:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email " });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 3600000 // 1 hour
        });

        return res.status(200).json({ success: true, message: "Login successful" });
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict"
        });
        return res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

// Send Verification OTP to the User's Email
export const sendVerifyOtp = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = User.findById(userId);
        if (user.isAccountVerified) {
            return res.status(400).json({ success: false, message: "Account already verified" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify Your Account",
            html: `<p>Your verification OTP is <strong>${otp}</strong>. It is valid for 10 minutes.</p>`
        };
        const transporter = getTransporter();
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: "Verification OTP sent successfully" });
    } catch (error) {
        console.error("Error in sending verification OTP:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
