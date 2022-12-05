
import Post from '../models/Post.js'
import User from '../models/User.js'

export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        delete user.password
        res.status(200).json({ user })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(({ _id, fullName, location, username, bio, picturePath  }) => {
            return { _id, fullName, location, username, bio, picturePath  }
        })
        res.status(200).json({ formattedFriends })
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== id)
        } else {
            user.friends.push(friendId)
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(({ _id, fullName, location, username, bio, picturePath }) => {
            return { _id, fullName, location, username, bio, picturePath }
        })
        res.status(200).json({ formattedFriends })

    } catch (err) {
        console.log(err)
        res.status(404).json({ message: err.message })
    }
}
export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
 
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}




/* UPDATE */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { bio } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { bio: bio },
            { new: true }
          );
      
          res.status(200).json({message:'success', updatedUser});

        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    };



    // Delete
    
    export const deleteUser = async (req, res) => {
        try {
      
          const { id } = req.params;
          await User.deleteOne({ _id: id });
          await Post.deleteMany({ userId: id });

          const users = await User.find(); //return all posts to the frontend
        //   const users = await Post.find(); //return all posts to the frontend
          res.status(200).json({msg:'User Deleted Successfully', users});
      
        } catch (err) {
          res.status(404).json({ message: err.message });
        }
      };
      