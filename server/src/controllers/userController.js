import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/userModal.js";
import { uploadOnCloudinary, deleteOnCloudinary } from "../utils/cloudinary.js";
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

    // Check and Upload CSV
    const csvFileLocalPath = req.files?.csv_file?.[0]?.path;
    if (!csvFileLocalPath) {
        return sendResponse(res, "error", null, "CSV file is required", 400);
    }

    const csv = await uploadOnCloudinary(csvFileLocalPath);
    if (!csv) {
        return sendResponse(res, "error", null, "CSV file upload failed", 400);
    }

    // Create the user
    const user = await User.create({
        collegeName,
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

    if (!email) {
        return sendResponse(res, "error", null, "Email is required", 400);
    }

    if (!is_email_verified) {
        return sendResponse(res, "error", null, "Email is not verified", 400);
    }

    const user = await User.findOne({ email });
    
    if (!user) {
        return sendResponse(res, "error", null, "Invalid email", 404);
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const userWithoutSensitiveData = {
        _id: user._id,
        collegeName: user.collegeName,
        email: user.email,
        username: user.username,
        telephone: user.telephone,
        is_email_verified: user.is_email_verified,
        csv_file_path: user.csv_file_path,
        accessToken,
    };

    return sendResponse(res, "success", userWithoutSensitiveData, "Login successfully", 200);
});

export {
    registerUser,
    loginUser
};