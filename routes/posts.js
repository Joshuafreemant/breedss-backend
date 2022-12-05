import express from 'express'
import { getFeedPosts, getUserPosts, likePost,createComment,deletePost } from '../controllers/posts.js'
import { verifyToken } from '../middleware/auth.js'

const router =express.Router();



// read route
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", getUserPosts)

// update route
router.patch("/:id/like", verifyToken, likePost)
router.post("/:id/comment", verifyToken, createComment)

//delete
router.delete("/:id/delete", verifyToken, deletePost)

export default router;