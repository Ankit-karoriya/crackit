import { User } from "../models/user.model.js";
import { generateAccessToken } from "../utils/jwt.js";

const register = async (req, res) => {
    try {
        const { email, fullname, password } = req.body;

        if ([email, fullname, password].some((field) => !field || field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            return res.status(400).json({ message: "User already existed" })
        }


        const userCreated = await User.create({
            email,
            fullname,
            password
        });

        if (!userCreated) {
            return res.status(500).json({ message: "Registration failed, User is not registered" })
        }

        const accessToken = generateAccessToken({email, fullname});

        return res
        .status(201)
        .cookie("AccessToken", accessToken, {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict'})
        .json({
            message: "User registered successfully",
            user: {
                id: userCreated._id,
                email: userCreated.email,
                fullname: userCreated.fullname
            }
        })

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong in register controller" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = await user.isPasswordCorrect(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid user credentials" });
        }

        const loginuser = await User.findById(user._id).select("-password");
        const accessToken = generateAccessToken(loginuser);

        return res
            .status(200)
            .cookie("AccessToken", accessToken, {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict'})
            .json({ message: "User loggedin successfully", loginuser });

    } catch (error) {
        return res.status(500).json({ message: "Something went wrong in login controller" });
    }
}

const logout = async (req, res) => {
    try {
        return res
            .status(200)
            .clearCookie("AccessToken", {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: 'strict'})
            .json({ message: "User Logout Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong in logout controller" });
    }
}

export { register, login, logout };