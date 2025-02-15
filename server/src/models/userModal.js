import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        collegeName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String,
            required: true,
        },
        is_email_verified : {
            type: Boolean,
            required:true,
        },
        csv_file_path: {
            type: String,
            required: true,
        },
        // password: {
        //     type: String,
        //     required: [true, 'Password is required']
        // },
        telephone : {
            type: String,
            required : false,
        },
        refreshToken: {
            type: String
        },

        // role: {
        //     type: String,
        //     enum: ['student', 'teacher'],
        //     required: true
        // }
    },
    {
        timestamps: true
    }
);

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)