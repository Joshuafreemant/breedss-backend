
import express from 'express'
import { getUser, getUserFriends, addRemoveFriend,updateUser,getAllUser,deleteUser } from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get("/:id", verifyToken, getUser)
router.get("/", verifyToken, getAllUser)
router.get("/:id/friends", verifyToken, getUserFriends)
router.put("/:id", verifyToken, updateUser)
router.put("/:id/:friendId", verifyToken, addRemoveFriend)

router.delete("/:id/delete", verifyToken, deleteUser)


export default router;