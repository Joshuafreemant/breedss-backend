
import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    recieverId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },

},
    {
        timestamps: true
    }
);

const Notification = mongoose.model("Notification", NotificationSchema)
export default Notification;