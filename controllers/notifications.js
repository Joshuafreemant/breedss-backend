import Notification from "../models/Notifications.js";


/* READ */


  export const getNotifications = async (req, res) => {
    try {
      const  {id}  = req.params;
      const notify = await Notification.find({ recieverId:id });
      res.status(200).json(notify);

      
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };