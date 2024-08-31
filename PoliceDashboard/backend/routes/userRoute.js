import express from "express"
import { SignUp, loginUser } from "../controllers/userLogin.js"
const userRouter = express.Router()


userRouter.post("/register", SignUp)
userRouter.post("/login", loginUser)
export default userRouter;
