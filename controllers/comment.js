
import Notifications from '../models/Notifications.js'
export const createComment = async (req, res) => {
    try {
      const { descriptions, fullNames,userIds } = req.body;
      const { id } = req.params;
      console.log(id)
    //   const user = await Comment.findById(userId);
      const newComment = new Comment({
        postId:id,
        description:descriptions,
        userId: userIds,
        fullName:fullNames
      });
      await newComment.save();

      
    const newNotification = new Notifications({
      recieverId: reciever,
      senderId: userId,
      description: `${userg[0].fullName} Just liked your post`,
    });
  
      const comment = await Comment.find(); //return all posts to the frontend
      res.status(201).json(comment);
    } catch (err) {
      res.status(409).json({ message: err.message });
    }
  };