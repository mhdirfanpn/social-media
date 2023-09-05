import express from 'express'
const router = express.Router()
import { updateUser, deleteUser, getUser, followUser, unFollowUser } from '../controller/userController.js'

//update user
router.put("/:id", updateUser)

//delte user
router.delete("/:id", deleteUser)

//get user
router.get("/:id", getUser)

//follow a user
router.put("/:id/follow", followUser)

//unfollow a user
router.put("/:id/unfollow", unFollowUser)

export default router