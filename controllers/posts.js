import Post from '../models/Post.js'
import User from '../models/User.js'
import Notifications from '../models/Notifications.js'


/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, category } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      fullName: user.fullName,
      username: user.username,
      location: user.location,
      description,
      category,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const posts = await Post.find(); //return all posts to the frontend
    res.status(201).json({message:'Post Published Successfully', posts});
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};


/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {

    const { id } = req.params;
    const { userId, reciever } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
  

    const userg = await User.find({ _id: userId });
    


    const newNotification = new Notifications({
      recieverId: reciever,
      senderId: userId,
      description: `${userg[0].fullName} Just liked your post`,
    });
    await newNotification.save();


    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const createComment = async (req, res) => {
  try {

    const { id } = req.params;
    const { fullName, comments, reciever, userId } = req.body;
    let comm = { userId: fullName, comment: comments };
    const post = await Post.findById(id);

    post.comments.push(comm);
    await post.save();

    const userg = await User.find({ _id: userId });

    const newNotification = new Notifications({
      recieverId: reciever,
      senderId: userId,
      description: `${userg[0].fullName} Just commented on your post`,
    });
    await newNotification.save();

    

    const posts = await Post.find(); //return all posts to the frontend
    res.status(200).json(posts);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {

    const { id } = req.params;
    await Post.deleteOne({ _id: id });


    const posts = await Post.find(); //return all posts to the frontend
    res.status(200).json(posts);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


