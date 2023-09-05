import express from 'express'
const router = express.Router()
import { createPost, updatePost, deletePost, likePost, getPost, getTimelinePosts } from '../controller/postController.js'

//create a post
router.post("/", createPost)

//update post
router.put("/:id", updatePost)

//delete post
router.delete("/:id", deletePost)

//like / dislike post
router.put("/:id/like",likePost)

//get post
router.get("/:id", getPost)

//get timeline posts
router.get("/timeline/all", getTimelinePosts)

export default router