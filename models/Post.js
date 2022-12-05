
import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    picturePath: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    category: {
        type: String,
        required: true,

    },
    comments: [{
        userId: String,
        comment: String
     }],
     
},
    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", PostSchema)
export default Post;