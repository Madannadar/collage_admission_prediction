import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModal.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";
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
    const { collegeName, email, username, telephone, is_email_verified } =
        req.body;
    console.log('e',is_email_verified)
    if (!is_email_verified) {
        return sendResponse(
            res,
            "error",
            null,
            "Please verify your email",
            400
        );
    }

    if (
        [collegeName, email, username].some((field) => !field?.trim())
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
    // const bcrypt = await import("bcryptjs");
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
        collegeName,
        avatar: avatar.url,
        email,
        username: username.toLowerCase(),
        csv_file_path: csv.url,
        telephone: telephone || null,
        is_email_verified
    });

    const createdUser = await User.findById(user._id).select(
        "-refreshToken"
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, is_email_verified } = req.body;

    // Check if email and password are provided
    if (!email ) {
        return sendResponse(res, "error", null, "Email and password are required", 400);
    }

    // Check if the email is verified
    if (!is_email_verified) {
        return sendResponse(res, "error", null, "Email is not verified", 400);
    }

    // Find the user by email and include the password field
    const user = await User.findOne({ email });
    console.log(user)
    // If user does not exist, return an error
    if (!user) {
        return sendResponse(res, "error", null, "Invalid email or password", 404);
    }

    // Check if the password is correct

    // If password is incorrect, return an error
    // if (!password) {
    //     return sendResponse(res, "error", null, "Invalid email or password", 401);
    // }

    // Generate access and refresh tokens
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    // Set the refresh token in the user document
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Remove sensitive fields from the user object
    const userWithoutSensitiveData = {
        _id: user._id,
        collegeName: user.collegeName,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        telephone: user.telephone,
        is_email_verified: user.is_email_verified,
        csv_file_path: user.csv_file_path,
        accessToken,
    };

    // Set the access token in a cookie
    // const options = {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     sameSite: "strict",
    // };

    return sendResponse(res, "success", userWithoutSensitiveData, "Login successfully", 200)
        // .status(200)
        // .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", refreshToken, options)
        // .json(
        //     new ApiResponse(
        //         200,
        //         {
        //             user: userWithoutSensitiveData,
        //             accessToken,
        //             refreshToken,
        //         },
        //         "Login successful"
        //     )
        // );
});

export {
    registerUser,
    loginUser
};
