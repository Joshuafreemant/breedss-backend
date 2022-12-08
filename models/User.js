import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    username: {
        type: String,
        required: true,
        min: 2,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default:'',
    },
    role: {
        type: String,
        default:'',
    },
    status: {
        type: Number,
        default:1,
    },
    friends: {
        type: Array,
        default: [],
    },
    // friends: [{
    //     userId: String,
    //     fullName: String,
    //     bio: String,
    //     picturePath: String,
    //  }],
    viewProfile: {
        type: Number,
    },
    impressions: {
        type: Number,
    },
    location: {
        type: String,
        default: "",

    },
    bio: {
        type: String,
        default: "Your breedss bio goes here",

    },

},
    {
        timestamps: true
    }
);

const User = mongoose.model("User", UserSchema)
export default User;