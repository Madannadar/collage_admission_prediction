import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModal.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
import bcrypt from "bcrypt";
import sendResponse from "../utils/apiResonse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefereshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something went wrong while generating referesh and access token"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { collegeName, email, username, password, telephone, is_verified } =
        req.body;

    if (!is_verified) {
        return sendResponse(
            res,
            "error",
            null,
            "Please verify your email",
            400
        );
    }

    if (
        [collegeName, email, username, password].some((field) => !field?.trim())
    ) {
        return sendResponse(res, "error", null, "All fields are required", 400);
    }

    // Check if user already exists
    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        return sendResponse(
            res,
            "error",
            null,
            "User with email or username already exists",
            409
        );
    }

    // Check and Upload Avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    if (!avatarLocalPath) {
        return sendResponse(res, "error", null, "Avatar file is required", 400);
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        return sendResponse(
            res,
            "error",
            null,
            "Avatar file upload failed",
            400
        );
    }

    // Check and Upload CSV
    const csvFileLocalPath = req.files?.csv_file?.[0]?.path;
    if (!csvFileLocalPath) {
        return sendResponse(res, "error", null, "CSV file is required", 400);
    }

    const csv = await uploadOnCloudinary(csvFileLocalPath);
    if (!csv) {
        return sendResponse(res, "error", null, "CSV file upload failed", 400);
    }

    // Hash Password before saving
    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        collegeName,
        avatar: avatar.url,
        email,
        password: hashedPassword,
        username: username.toLowerCase(),
        csv_file_path: csv.url,
        telephone: telephone || null,
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        return sendResponse(
            res,
            "error",
            null,
            "Something went wrong while registering the user",
            500
        );
    }

    return sendResponse(
        res,
        "success",
        createdUser,
        "User registered successfully",
        201
    );
});

// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         throw new ApiError(400, "Email and password are required");
//     }

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//         throw new ApiError(404, "Invalid email or password");
//     }

//     const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (!isPasswordCorrect) {
//         throw new ApiError(401, "Invalid email or password");
//     }

//     const token = generateAccessAndRefereshTokens({
//         _id: user._id,
//         email: user.email,
//     });

//     res.cookie("token", token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//     });

//     const userWithoutSensitiveData = {
//         _id: user._id,
//         collegeName: user.collegeName,
//         email: user.email,
//         role: user.role,
//         avatar: user.avatar,
//         username: user.username,
//         token,
//     };

//     return res.status(200).json(
//         new ApiResponse(200, userWithoutSensitiveData, "Login Successful")
//     );
// });

export {
    registerUser,
    // loginUser
};
