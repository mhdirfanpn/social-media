import express from "express";
const router = express.Router();
import { register, login } from "../controller/authController.js";

//register
router.post("/register", register)


//login
router.post("/login", login)

export default router;
